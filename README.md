Developed a website listing organizations using Django and React. The node_modules file is not loaded because it is large. So to run the project as developer after the download is complete,

--npm start

Open http://localhost:3000 to view it in your browser.

--npm run build

Builds the app for production to the build folder.

Download and create virtual environment for Django.

--pip install virtualenv

--python -m virtual myenv

Thanks to the 
--myenv\scripts\activate 
command, you can enter myenv and add libraries there.

Django was installed with the command pip install django and to create the project,

--django-admin startproject base .

After all the installation procedures are done

--python manage.py runserver

Open http://localhost:8000 to view it in your browser. 

--python manage.py migrate 

to create database

--python manage.py createsuperuser to create admin
to login to my project as admin with docker (email=esin@gmail.com, password=bennapicam12)

Added docker compose(postgresql) to the project. To run it, go to the folder where the docker-compose.yml file is located in the terminal 
and give the docker-compose up command. Docker Compose will pull all the Images contained in 
the YAML file first (if it hasn't been pulled before) and then run it.
