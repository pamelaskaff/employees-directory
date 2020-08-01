# employees-directory
Employees directory using React typescript and nodejs 

The two projects should run locally in parallel

## `cd react-app`
Go to react app directory 

# `npm install`
Installs the packages that should be used in the react project 

# `npm start`
Runs the react app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# `cd nodejs-app`
Go to nodejs app

## `npm install`
Installs the packages that should be used in the nodejs project 

## `npm start`
Runs the nodejs app in the development mode.<br />
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

**Note: You can also run the app using Docker**


## Run app using Docker
You can build the image with this command 

## `docker build -t react-node-image .`

You can run the image with this command 
## `docker run -d -p 3080:3080 --name react-node-ui react-node-image`

You can exec into the running container to explore the file system docker
## `exec -it react-node-ui /bin/sh`

You can access container logs with this command 
## `docker logs react-node-ui`