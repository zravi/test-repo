to setup and run create db in postgres
update backend env file
also update be/config/config.json for db credentials
npm i to install node modules
npm run migrate to create tables in database

to run front end ui 
npm i to install node modules then
update front end src/constant.js for baseurl of backend

end points
METHOD POST http://localhost:5000/v1/student         create record
METHOD GET http://localhost:5000/v1/student          get all students
METHOD GET http://localhost:5000/v1/student/:id      get by id 
METHOD PUT http://localhost:5000/v1/student/:id      update by id
METHOD DELETE http://localhost:5000/v1/student/:id   remove by id