
## The app is on heroku [chat-app-with-mean](https://chat-app-with-mean.herokuapp.com/dashboard)

## Front-end
- make sure angular cli is installed or install it with ```npm install -g @angular/cli```
- create a new project by ```ng new <frontend-name>``` in the project root folder.
- goto angular-cli.json, change outDir to our projects 'public' folder, so that compiled static files(html,css,bundle.js) are output to that folder
- ### flash messages
    - ```npm i angular2-flash-messages``` inside angular-src folder not in root folder as this is only for frontend
    - make sure <flash-messages> is set in app.component.html
- ### authentication
    - ```npm install angular2-jwt```
    - only a small package called ``tokenNotExpired`` is used

## build
- run ```ng build``` in angular-src folder to build the static files
## Deploying to Firebase
- Well a dissappointment
- dont know exact reason but routes not working because of failure to connect to remote database.
- may be because of spark plan 

## Deploying to heroku
- we have to expose config/api_key files to git here by removing them from .gitignore
- make sure port is set to  ```process.env.PORT || 8080``` :- heroku sets port by its own, 8080 is a fallback for local testing
- install heroku cli
- then follow commands
- ```heroku create```
- ```git commit -am "deploying to heroku"```
- ```git push heroku master```
- ```heroku open``` (opens browser)
- For logs : ```heroku logs --tail```
- Changing name of app: heroku apps:rename chat-app-with-mean
- Removing heroku from project : ```git remote rm heroku```

