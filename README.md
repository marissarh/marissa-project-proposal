# self-evaluation

I continued working on creating a messaging app. This time I decided to demo my work by using Postman. I started with setting up the folder and installing mongoose, express, bcrypt, jsonwebtoken, as well as creating the projects on Postman and MongoDB. 
I set up the /routes/auth.js and /user.js and /message.js in the code as well as in PostMan. I also generated a json token, and used bcrypt to hash the users' passwords. 
I added middleware (verifyRoute) to /routes/user.js and /message.js.

As I tested my code on Postman, I got stuck not being able to figure out how to send messages to another user, as well as, viewing messages between users. This became a challenge.

Testing my code also became a challenge. As I tried to write the test code and test it, I found myself changing too many things, to the point, when I went back to run the server, MongoDB would not connect. So I tried to reverse my code so I would have something to demo in class. 

I really enjoyed writing the routes and seeing my code work on Postman and MongoDb, but I got frustrated as I saw other parts of my code fail, and cause errors. Next time I would like to reach out to the instructors sooner to find solutions instead of trying to figure it out on my own. 

# marissa-proof-of-concept

UPDATE:
Supplemental Topic Presentation powerpoint created. 
Messaging App is almost done, used Firebase/Firestore.

App still not working properly, such as signing in using a different Google Account, 
and sent and received messages share the same css, which needs to be changed, currently trying to figure that out.

For the final project, I will have to use Mongoose, mongodb, and write tests.

# marissa-project-proposal

1. A description of the scenario your project is operating in.

   I will be creating a real-time chat-room application. Users will sign in with Google. The home screen will show a log-in button, once logged in, the chat-room will display. Firebase will collect and store data including userIDs, messages, and timestamp. 

2. A description of what problem your project seeks to solve.
   
   My project may display problems accessing methods to login, as well as using the Google sign-in method. Another problem that could occur, is limiting how many people can join the chat-room, and how long the data collected will be stored, and how much of the data will be stored.

5. A description of what the technical components of your project will be, including: the routes, the data models, any external data sources you'll use, etc.
   
   Routes: signup, login, logout, messages, users
   Data Models: user model, message model
   External Data Sources:
     Firebase Authentication for user sign up, login, and logout,
     Firestore for storing messages, and users,
     Google login
   React for FrontEnd Components

7. Clear and direct call-outs of how you will meet the various project requirements.
   Firebase will be used to authenticate users when they sign-up and login, creating a secured chat-room application. I will provide error messaging to users when there is an unexpected or invalid error.I will document and testing to ensure the function of the application.

9. A timeline for what project components you plan to complete, week by week, for the remainder of the class.
   This Week:
     Create Firebase project,
     Create user authentication using Firebase,
     Use React to display message box, login/sign-up buttons, etc,
     Set up authentication and authorization middleware for routes
   Next Week:
     Synchronize frontend and backend functionality,
     Implement error handling, error messaging,
     Write tests, and documentation,
     Create PowerPoint to use for presentation,
   


