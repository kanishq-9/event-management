# Event Management
A full-stack event management platform which helps user to create, register, delete, unregister for an event. Built with React, Node.js, Express, and MongoDB.

## Features
- User Authentication: Signup, login, and sessions.
- Events: Create, update, and view Events.
- User Registrations: Register and unregister from an event.
- Responsive UI: Built with React and Bootstrap, optimized for desktop and mobile.
- Security: Uses Helmet for CSP, cors and secure headers.

## Technologies
- Frontend: React, Bootstrap, JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB (NoSQL)
- Other Tools: REST APIs, Helmet for security, Nodemon for development
- Deployment + CI/CD: Render (backend), static frontend via React build

```
eventmanagement/
│
├─ client/                  
│   ├─ public/              
│   ├─ src/
│   │   ├─ components/     
│   │   ├─ pages/           
│   │   └─ App.js
│   └─ package.json
│
├─ server/                 
│   ├─ app.js            
│   ├─ server.js           
│   ├─ routes/
|   ├─ config/            
│   └─ models/             
│
├─ README.md
└─ package.json
```

## Installation and Setup
### 1.Clone the repository:
```
mkdir eventmanagement
cd ./eventmanagement
git clone https://github.com/kanishq-9/event-management.git
```
### 2.Install backend dependencies:
```
cd server
npm install
```
### 3.Install frontend dependencies and build:
```
cd ../client
npm install
```
### 4.Environment Variables:
Create a .env file in the server folder:
```
PORT=...
MONGO_DB_URL=...
REACT_APP_FETCH_URL=""
```
## Running the App
### 1.Frontend Production build
```
cd client
npm run build
```
### 2.
```
cd ../server
npm run watch
```

## Deployment
- Backend hosted on Render.<br>
- Frontend can be deployed on Vercel, Netlify, or served as a static build(if frontend and backend runs seperate).<br>
 [My Live Project](https://event-management-z9i6.onrender.com/login)<br>
 if the render is inactive wait until it comes live<br>
 
 ## Helmet Configurations
 ```
helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
    scriptSrcElem: ["'self'", "https://cdn.jsdelivr.net"],
    styleSrc: ["'self'", "https:", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
});
```
# Architecture
<img width="849" height="397" alt="MERNArchitecture" src="https://github.com/user-attachments/assets/b8d1934b-5fa6-46b5-9661-55f7f3d5b2b7" />
