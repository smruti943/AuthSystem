This is a Simple web application authientication system.                                                                             

**Technology stack**: Node.js,React,MySQL,Jquery,CSS,HTML

The application is divided in two folders named as **backend** and **frontend**. All app **server-side** files can be found in **backend** folder. Similarly **client-side** files are kept in **forntend** folder.

**Backend:**
 **MySQL** used as database. Other installations for server setup are **express,bcrypt,jwt,cors and bodyParser.**                              
 
 Database should be created and updated details in **MySQL Database connection**.                                       
 
 Created one **user** table in **MySQL** with 3 columns->  id | email | password 

 Passwords are securely hashed before storing in database.This is done in server-side but to insert data from client-side we added a registation form. Which will register new users with password. 
Validation added to check password characters should be more than **6 chars**.                                         

 JWT implemented for token based authentication. This will generateJWT token and expier time set as 30 min.


 **Frontend:**
React project created for client-side development. Login and welcome page and its html can be found in App.js. Regiser.js is created to user registration. 
It is possible to design different js file for different page but as am creating a simple application, I put most of the things in App.js.
**Login**,**Welcome** and **Registration** forms are styled using **CSS**.

You are free to design as per your desired folder structure.                                                            

HTTPS not implemented.

 
