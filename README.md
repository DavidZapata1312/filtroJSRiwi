# SPA Event Manager - David
A Single Page Application (SPA) created with HTML, CSS and modular JavaScript, with an authentication and role control system (admin vs customer). Based on JSON Server as backend mock.

## Start

### 1. Clone the repository

```bash
git clone https://github.com/filtroJSRiwi
```

### 2. Install dependencies

```bash
npm install
```

### 3. Raise the development server

```bash
npm run dev
```

This will start a development server using **Vite**. You can open the app in your browser at:

```
http://localhost:5173
```

## Project structure

```
/
│
├── app/
│ ├── components/
│ │ ├── sidebar.js
│ ├── templates/
│ │ ├── admin.js
│ │ ├── login.html
│ │ ├── public.html
│ │ ├── newevent.html
│ │ └── register.html
│ ├── pages/
│ │ ├── admin.js 
│ │ ├── login.js 
│ │ ├── public.js
│ │ ├── register.js 
│ │ └── newEvent.js 
│ └── assets/
│ └── style.css
│ ├── services/
│ │ ├── auth.js
│ │ ├── api.js
│
├── index.js
├── main.js
├── db.json 
└── README.md
```
##🛠 Personalization In db.json, I defined at least one admin user: 
```Json { "id": 1, "name": "Admin David", "email": "david@admin.com", "password": "1234", "role": "admin" } ```
## Technologies used 
- **JavaScript**: SPA main logic
-  **Vite**: Fast packer for modern development
 - **HTML and CSS**: Interface structure and styles

## 🧠 How does localStorage work in this project?
This app uses localStorage to temporarily save the logged-in user. This allows the user to navigate between pages without having to log in again each time.
```
Js localStorage.setItem("loggedUser", JSON.stringify(found)); 
``` 
The saved value (loggedUser) contains data such as id, name, email and role. Then, anywhere in the app, you can get it with: 
```
 const user = JSON.parse(localStorage.getItem("loggedUser"
```

This storage persists even if the page is reloaded, until the user logs out. 
## 🔐 Roles: Admin vs User Users 
in this app can have a role field that defines their permissions:
admin: You have full access. Can:  Create new events. Edit and delete events from the list. Access the route /newevent. 
customer: You have limited access. Can only: See the list of events and sign up for events. You cannot edit, delete, or access /newevents. 
Role logic applies both visually (hiding buttons and links) and functionally (blocking protected paths).
