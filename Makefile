VENV_PATH := $(HOME)/venv/bin
CLIENT_PATH := $(HOME)/proj/client
PROJ_NAME := smmaster

clean:
	rm ./webroot/media/test -rf

runserver:
	$(VENV_PATH)/python manage.py runserver 0.0.0.0:8000

start:
	mkdir -p var
	$(VENV_PATH)/gunicorn --preload --pid var/gunicorn.pid \
		-D -b 127.0.0.1:8000 $(PROJ_NAME).wsgi:application

stop:
	kill `cat var/gunicorn.pid` || true

restart: stop start

pep8:
	$(VENV_PATH)/pycodestyle --exclude=*migrations*,*settings_local.py* \
		--max-line-length=119 --show-source  $(PROJ_NAME)/

pyflakes:
	$(VENV_PATH)/pylama --skip=*migrations*,*settings_local.py*,*_tester.py -l pyflakes $(PROJ_NAME)/

lint: pep8 pyflakes

fe_test:
	cd $(CLIENT_PATH) && npm run test && npm run lint

test:
	$(VENV_PATH)/python manage.py test -v 1 --noinput --parallel=8 || make clean

cover_test:
	$(VENV_PATH)/coverage run --source=$(PROJ_NAME) manage.py test -v 2 --noinput || (make clean && exit 1)
	make clean

cover_report:
	$(VENV_PATH)/coverage report -m
	$(VENV_PATH)/coverage html
	$(VENV_PATH)/coverage-badge > htmlcov/coverage.svg

non_covered:
	$(VENV_PATH)/coverage run --source=$(PROJ_NAME) manage.py test -v 1 --noinput
	make cover_report | grep -v "100%"

cover: cover_test cover_report

ci_test: cover_test cover_report lint fe_test

wheel_install:
	$(VENV_PATH)/pip install --no-index -f wheels/ -r requirements.txt

locale_search:
	$(VENV_PATH)/python manage.py makemessages --all
	$(VENV_PATH)/python manage.py compilemessages

lint_frontend:
	node client/node_modules/eslint/bin/eslint.js client/markup/components/**/*.js


runcelery:
	$(VENV_PATH)/celery -A $(PROJ_NAME) worker -l info -B -s ./var/celerybeat-schedule

runcelery_multi:
	$(VENV_PATH)/celery multi restart $(PROJ_NAME)_worker \
		-A $(PROJ_NAME) -l info -B -s ./var/celerybeat-schedule \
			--logfile="./var/celery_%n.log" \
			--pidfile="./var/celery_%n.pid"

stopcelery_multi:
	kill `cat var/celery_$(PROJ_NAME)_worker.pid` || true

restart_celery: stopcelery_multi runcelery_multi


reprovision:
	 cd provision &&\
	ANSIBLE_HOST_KEY_CHECKING=False ansible-playbook --private-key=../.vagrant/machines/default/virtualbox/private_key -u vagrant -i ../.vagrant/provisioners/ansible/inventory/vagrant_ansible_inventory reprovision.playbook.yml

deploy_beta:
	cd provision &&\
	ansible-playbook -i beta.hosts beta-deploy.playbook.yml
