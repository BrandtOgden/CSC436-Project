# Climbify - CSC 436 Final Project 
### Created By  Brandt Ogden, Anthony Francisco, and Nick Powers

Climbify is a full stack social media website made for climbers. You can do things like view posts made by others, interact with friends, view climbs created by others, and keep track of the climbs you have completed. It's built with a MySQL database, a Flask RESTful API, and a React frontend. 

# Local Setup

## Prerequisites
This project require the following software to be installed:
- **Node.js**: Version 18.x or higher is recommended, see [Node.js Official Website](https://nodejs.org/en)
- **npm**: Bundled with Node.js

To verify installation run:
```
node -v
npm -v
```
You will need the `.env` file in `/flask/app` that holds the MySQL database connection information and the JWT secret key. If you would like this reach out to Brandt and he can get you a copy. We currently have a MySQL database that is hosted on AWS RDS that needs to be up for the app to work. 

## Dependencies
To install the Flask dependencies used for this project, from the `flask` directory run `pip install -r requirements.txt`.

To install React dependencies navigate to the `react-app` directory and run `npm install`.

## Running The App
To get started you need to start the Flask API and then the React frontend navigate to `flask` directory and run `python3 run.py`. On a separate terminal navigate to `react-app` directory and rum `npm start`, and you should automatically be brought to the Climbify homepage.   

