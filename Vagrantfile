# vi:syntax=ruby
ip_address = "10.1.1.156"
hostname = "smmaster"

SYNC_FOLDER = true


# Prepare probison script to forward ENV variables
env_var_cmd = ""
FORWARDED_VARIABLES = ['CI_FLAG', 'GIT_HASH', 'BUILD_NUMBER', 'TEAMCITY_BUILD_PROPERTIES_FILE']
for env_var in FORWARDED_VARIABLES
    if ENV[env_var]
      value = ENV[env_var]
      env_var_cmd += <<CMD
    echo "export #{env_var}=#{value}" | tee -a ~/.profile
CMD
    end
end


Vagrant.configure(2) do |config|
  # Virtual machine parameters
  #config.vm.box = "debian/stretch64"
  config.vm.box = "template"
  config.vm.box_version = "1.4"
  config.vm.box_url = "http://boxes.wbtech.pro/template"
  config.vm.box_check_update = false

  config.vm.network "private_network", ip: ip_address

  # disable virtualbox guest addition autoupdate
  if Vagrant.has_plugin?("vagrant-vbguest")
    config.vbguest.auto_update = false
  end

  config.vm.synced_folder ".", "/vagrant", disabled: false, type: "rsync"
  if SYNC_FOLDER then
    if ENV['CI_FLAG'] then
      config.vm.synced_folder ".", "/home/vagrant/proj", type: "rsync"
    elsif ENV['NO_NFS'] then
      config.vm.synced_folder ".", "/home/vagrant/proj"
    else
      config.vm.synced_folder ".", "/home/vagrant/proj", type: "nfs",
      :mount_options => ['actimeo=2']
    end
  end

  config.vm.hostname = hostname
  config.vm.post_up_message = "#{hostname} dev server successfuly started.
    Connect to host with:
    http://#{ip_address}/
    http://#{ip_address}/site-management
    or over ssh with `vagrant ssh`
    Admin user credentials:
      login: root
      password: 123123
  "

  # Set box name
  config.vm.define :"#{hostname}_vagrant" do |t|
  end
  # Virtualbox specific parameters
  config.vm.provider "virtualbox" do |v|
    if ENV['BUILD_NUMBER'] then
        v.name = "#{hostname}_vagrant_#{ENV['BUILD_NUMBER']}"
    else
        v.name = "#{hostname}_vagrant"
    end
    v.memory = 1024
    v.cpus = 2
    v.linked_clone = true
  end
  # Set env variables
  config.vm.provision "shell", inline: env_var_cmd, privileged: false
  config.vm.provision "shell", inline: 'echo "export LC_ALL=en_US.UTF-8" >> /etc/environment', privileged: true
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provision/vagrant.playbook.yml"
  end
  config.vm.provision "shell", inline: 'echo ". ~/venv/bin/activate" >> ~/.bashrc', privileged: false
end
