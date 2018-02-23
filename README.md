
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

