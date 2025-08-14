IELTS Mock Test Platform

This project is a full-stack web application for creating and running IELTS mock tests.
It includes a Node.js + Express + MongoDB backend and a React (Vite + Tailwind) frontend.

Tech Stack

Backend: Node.js, Express, MongoDB (Mongoose)

Frontend: React (Vite), TailwindCSS, React Router

HTTP Client: Axios

Setup

Backend
cd backend
npm install
npm run dev

The backend will start at http://localhost:3000.

Frontend
cd frontend
npm install
npm run dev
The frontend will start at http://localhost:5173.

API Endpoints
Tests

POST /tests – Create a new test

GET /tests – Get all tests

GET /tests/:id – Get a test by ID

PUT /tests/:id – Update test details

DELETE /tests/:id – Delete a test

Listening Section

POST /tests/:testId/listening – Add a Listening section (HTML context and inputs)

GET /listening/:id – Get a Listening section by ID

PUT /listening/:id – Update a Listening section

DELETE /listening/:id – Delete a Listening section

Listening Attempts

POST /listening-attempts – Submit answers for a Listening section (score is calculated)

GET /listening-attempts – Get all attempts (can filter by testId or userId)

GET /listening-attempts/:id – Get a single attempt

PUT /listening-attempts/:id – Update an attempt

DELETE /listening-attempts/:id – Delete an attempt

Frontend Routes
Admin

/admin/create-test – Create a new test

/admin/add-listening – Add a listening section by pasting HTML

User

/ – Display available tests

/tests/:id – Take a test and submit answers
