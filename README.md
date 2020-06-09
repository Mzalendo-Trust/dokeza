# Dokeza Platform

The Dokeza platform allows the Kenyan public to participate in the development of a legislative bill in a structured manner. The platform allows for sections of legislative bills to be annotated and commented on. 

The ability for an interested member of the public to comment on the entire bill is also possible. Go to the [Dokeza platform](https://dokeza.mzalendo.com/).

## Installation

The Dokeza implementation is built using the [Docker](https://www.docker.com/) for an easier and more consistent way to develop and deploy the platform.

Make sure the `docker` application is installed on your development environment. Clone this repo and enter it. Once you are in, run

```bash
docker-compose -f local.yml build
```
Once the build process is complete, you may now start up the platform in `docker`.

```bash
docker-compose -f local.yml up -d
```
The `-d` flag allows one to start the process without tying up the current terminal window as the application starts up.

## Usage
This repository is built on top of the [Cookiecutter-django](https://github.com/pydanny/cookiecutter-django), a speedy way to set up a production ready project for development. For further 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)