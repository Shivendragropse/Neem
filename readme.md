Create Account On AWS
Login To AWS Console
Create Amazoan Ec2 Instance
Download Pem File
Open Terminal and going to directory where download PEM file
Connect to your server 
After connect the server Going to root user With => "sudo su"
Update your server => "sudo yum update -y"
Install Lamp Server => " sudo yum install -y httpd24 php70 mysql56-server php70-mysqlnd "
Start the Apache Server => "sudo service httpd start"
Use the chkconfig command to configure the Apache web server to start at each system boot => "sudo chkconfig httpd on".
You can verify that httpd is on by running the following command => "chkconfig --list httpd"
Start the MySQL server => "sudo service mysqld start"
Run mysql_secure_installation => "sudo mysql_secure_installation"
Stop mysql server => "sudo service mysqld stop"

If you want the MySQL server to start at every boot, type the following command => "sudo chkconfig mysqld on"
To install phpMyAdmin => "sudo yum install php70-mbstring.x86_64 php70-zip.x86_64 -y"
Restart Apache => "sudo service httpd restart"
Select a source package for the latest phpMyAdmin release => "wget https://www.phpmyadmin.net/downloads/phpMyAdmin-latest-all-languages.tar.gz"
Create a phpMyAdmin folder and extract the package into it using the following command.=> "mkdir phpMyAdmin && tar -xvzf phpMyAdmin-latest-all-languages.tar.gz -C phpMyAdmin --strip-components 1"
Delete the phpMyAdmin-latest-all-languages.tar.gz tarball => "rm phpMyAdmin-latest-all-languages.tar.gz"
If the MySQL server is not running, start it now => "sudo service mysqld start"

If you have any problem to install lamp server and php myadmin check this video => "https://www.youtube.com/watch?v=FHbu0703DEw&list=WL&index=2&t=754s"

To Install Node.js
Install node version manager (nvm) by typing the following at the command line =>"curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash"
Activate nvm by typing the following at the command line =>". ~/.nvm/nvm.sh"
Use nvm to install the version of Node.js you intend to use by typing the following at the command line =>"nvm install 4.4.5" (To install Specific Version of Node.js Mention the version after nvm install);