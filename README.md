# smmaster

## Development server

To run development server:
```
git clone ...
cd smmaster
vagrant up
```

To destroy development server run in project dir:
```
vagrant destroy
```

To run tests on development server run in project dir:
```
vagrant ssh
cd proj
make ci_test
```
