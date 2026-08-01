# 🌍 WanderLust

WanderLust is a full-stack web application for exploring and managing travel accommodation listings. Users can browse properties, view listing details, and create, edit, or delete listings.

The project is built using **Node.js, Express.js, MongoDB, Mongoose, EJS, and Bootstrap** and is deployed using **Render** with **MongoDB Atlas** as the cloud database.

## 🚀 Live Demo

**WanderLust:**
https://wanderlust-mu7e.onrender.com

> The application is hosted on Render, so the server may take a short time to start after a period of inactivity.

## ✨ Features

* Browse travel accommodation listings
* View detailed information about individual properties
* Add new listings
* Edit existing listings
* Delete listings
* Store listing information in MongoDB
* Display property images using image URLs
* Responsive interface using Bootstrap
* Server-side rendering with EJS
* RESTful routing
* Cloud-hosted MongoDB database
* Deployed Node.js/Express backend

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* Bootstrap
* EJS

**Backend**

* Node.js
* Express.js
* Method Override
* EJS Mate

**Database**

* MongoDB
* Mongoose
* MongoDB Atlas

**Deployment**

* GitHub
* Render

## 📁 Project Structure

```text
WanderLust/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── model/
│   └── listing.js
│
├── public/
│   └── css/
│       └── style.css
│
├── views/
│   ├── includes/
│   │   ├── navbar.ejs
│   │   └── footer.ejs
│   │
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   └── listings/
│       ├── index.ejs
│       ├── show.ejs
│       ├── new.ejs
│       └── edit.ejs
│
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/mishrasr8/WanderLust.git
```

### 2. Enter the project directory

```bash
cd WanderLust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure MongoDB

Create a `.env` file or provide the following environment variable:

```text
ATLASDB_URL=your_mongodb_connection_string
```

Never commit your MongoDB connection string or database credentials to GitHub.

### 5. Start the application

```bash
npm start
```

The application will run locally at:

```text
http://localhost:8080
```

## 🗄️ Database Initialization

Sample listing data is available inside:

```text
init/data.js
```

To initialize the database with sample listings:

```bash
npm run init-db
```

> Warning: The initialization script may delete existing listings before inserting the sample data. Use it carefully.

## 🛣️ Routes

| Method | Route                | Description                     |
| ------ | -------------------- | ------------------------------- |
| GET    | `/`                  | Redirects/opens the application |
| GET    | `/listings`          | Display all listings            |
| GET    | `/listings/new`      | Form to create a listing        |
| POST   | `/listings`          | Create a new listing            |
| GET    | `/listings/:id`      | View a specific listing         |
| GET    | `/listings/:id/edit` | Edit a listing                  |
| PUT    | `/listings/:id`      | Update a listing                |
| DELETE | `/listings/:id`      | Delete a listing                |

## 📦 Main Dependencies

* `express` — Web application framework
* `mongoose` — MongoDB object modeling
* `ejs` — Template engine
* `ejs-mate` — EJS layout support
* `method-override` — Enables PUT and DELETE requests from HTML forms
* `bootstrap` — Responsive UI components

## 🌐 Deployment

The application is deployed as a **Web Service on Render**.

Production flow:

```text
GitHub
   ↓
Render
   ↓
Node.js / Express
   ↓
MongoDB Atlas
```

Render automatically builds the project using:

```bash
npm install
```

and starts the application using:

```bash
npm start
```

## 🔐 Environment Variables

The application requires:

```text
ATLASDB_URL
```

This should contain the MongoDB Atlas connection URI.

Do not store passwords, database credentials, or other secrets directly in the source code.

## 🔮 Future Improvements

* User authentication and authorization
* User accounts
* Listing ownership
* Reviews and ratings
* Image uploads
* Search and filtering
* Location/maps integration
* Form validation and improved error handling
* Flash messages
* Booking functionality

## 👨‍💻 Author

**Suyash Mishra**

GitHub: https://github.com/mishrasr8

## 📄 License

This project is currently licensed under the ISC License.
