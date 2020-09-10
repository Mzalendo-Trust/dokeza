# Document Builder

## Installation
[Download](https://download.onlyoffice.com/install/desktop/docbuilder/linux/onlyoffice-documentbuilder_amd64.deb) the Debian package on the desktop or a location of choice.

Then install it:

	`sudo apt upadate && sudo apt upgrade`
	`sudo apt install ./onlyoffice-documentbuilder_amd64.deb
	
### Install the Nodejs example

[Download](https://api.onlyoffice.com/app_data/docbuilder/Node.js%20Example.zip) the nodejs example and unzip it.
We install the environment.

	`sudo apt install nodejs`
	`sudo apt install npm`

Once that is done, we can go into our nodejs document builder example and install the dependencies:

	`cd Node.js\ Example`
	`npm install`

Finally, we start the server:

	`nodejs bin/www`

### Install the Python example

There was no Python example created by the ONLYOFFICE team, so we built one. It can be found [here]().

We installed the Django environment:

	`sudo apt install python3-pip`
	`pip3 install django`

We go into our Django project and launch the server:

	`python3 manage.py runserver 0.0.0.0:3300`


	

