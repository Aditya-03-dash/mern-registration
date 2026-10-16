# MERN Registration App

React (Vite) + Axios -> Express.js REST API -> MongoDB (Mongoose)

## Structure
- server/  Express API (config, models, controllers, routes, middleware)
- client/  React frontend (components, api.js)

## 1. Backend
    cd server
    npm install
    npm run dev

server/.env (copy of .env.example)
- PORT: port the API listens on
- MONGO_URI: local `mongodb://127.0.0.1:27017/registration_db` or your Atlas connection string
- CLIENT_URL: React origin allowed by CORS

## 2. Frontend
    cd client
    npm install
    npm run dev

client/.env -> VITE_API_URL is the API base URL (Vite only exposes variables starting with VITE_).

## 3. API endpoints
- POST   /api/registrations       create (201)
- GET    /api/registrations       list all (200)
- GET    /api/registrations/:id   get one (200)
- PUT    /api/registrations/:id   update (200)
- DELETE /api/registrations/:id   delete (200)

Errors: 400 validation or invalid ID, 404 not found, 409 duplicate email, 500 server error.

## 4. Testing with Postman
1. Import postman_collection.json.
2. Start the server. The baseUrl collection variable must match your PORT.
3. Run requests in order. POST stores the new _id in {{id}}, so GET one, PUT and DELETE work directly.
4. Check status code, JSON body and the Tests tab for each request.
