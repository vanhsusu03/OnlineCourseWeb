# Commercialization of Education: DNA Online Course Website

## :star2: Introduction

Open platform for students to learning and instructors for sharing own courses. Actors using this system contains student, instructor, administrator and guest.

Each actor will have their own activities. Student can deposit money, buy and study courses. Student can be upgrade to be instructor. Instructor can create personal courses and get money from selling it in the website. Administrator will control the whole processes in the system.

## :question: What's in this repository

This is some important part in our structure:
```
|_client/ --> Code for client side using Vue.js
      |_src/ --> sourse code
            |_assets/img --> all images
            |_components/ --> Vue.js files
            |_pages/ --> Vue.js files
            |_routes/ --> initialize routes for front-end
            |_store/ --> Vuex lib for state
      
|_server/ --> Code for server side using Node.js and Express.js
      |_controllers/ --> Code for all controllers
      |_middleware/ --> middleware in this system
      |_models/ --> Sequelize models 
      |_routes/ --> Routers
      |_utils/ --> Code for working with date and PayOS system
      |_env --> .env file for config server side
      
|_onlinecourse_schema.sql --> Schema file for SQL database

|_onlinecourse_data.sql --> Initialize datas for system
```

## :wrench: Installation

Our project is based on Vue.js for client side and Node.js + Express.js for server side. Datas for instant courses are crawled in Udemy platform.

Requirements:
* Vue.js 3.2.13
* Vuex 4.0.2
* Node.js 18.15.0
* npm 9.5.0
* Sequelize 6.30.0

Step-by-step introductions to get you running DNA ONline Course Web:
### 1) Clone this repository to your local machine:

```bash
git clone https://github.com/vanhsusu03/OnlineCourseWeb.git    
```
### 2) Running the client side

```bash
cd client
npm install
npm run serve
```
If the website running successfully, you can access it at ```https://localhost:8080```

### 3) Prepare for server side
* Open your SQL database workbench (MySQL Workbench for XAMPP, example) and running ```onlinecourse_schema.sql``` file to create "onlinecourse" database. Then, running ```onlinecourse_data.sql``` file to insert datas to using system.
* Config the .env file in server folder to your SQL config setup (HOST_NAME, PORT, PASSWORD,...)

### 4) Running the server side

```bash
cd server
npm install (or npm i)
npm start
```
If it's run successfully, you will see ***"SERVER IS LISTENING ON PORT 3000"***

## :raising_hand: Questions
If you have any questions about running this code, or this project, contact Duong Nguyen Viet Anh (dnvietanvnuuet@gmail.com/dnvietanhctn@gmail.com).

