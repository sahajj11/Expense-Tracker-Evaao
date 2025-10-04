# 💰 Expense-Tracker-Evaao

This repository contains the code for a full-stack web application designed to help users effectively track and manage their personal expenses.

## ✨ Features

* **Expense Tracking:** Core functionality for logging, viewing, and categorizing personal expenditures.
* **Full-Stack Architecture:** Decoupled client and server components for scalability and maintainability.
* **Web Interface:** An accessible and responsive user interface for managing financial data.
* **Data Persistence:** Handles storing and retrieving expense data via a backend API.

## 🛠️ Technology Stack

The project is a full-stack application relying primarily on JavaScript for both the frontend and backend.

| Component | Primary Technology | Details |
| :--- | :--- | :--- |
| **Primary Language** | JavaScript | The core language for the entire codebase. |
| **Architecture** | Full-Stack (Monorepo-style) | Separate `frontend` (Client) and `backend` (API/Server) services. |
| **Deployment** | Vercel | Used for hosting the application's live instance. |

## 🚀 How to Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need the following software installed on your machine:

* Node.js (LTS recommended)
* npm (comes with Node.js)
* A database instance (e.g., MongoDB, PostgreSQL, etc., as inferred by the full-stack design).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/sahajj11/Expense-Tracker-Evaao.git](https://github.com/sahajj11/Expense-Tracker-Evaao.git)
    cd Expense-Tracker-Evaao
    ```

2.  **Set up Environment Variables:**
    Create a `.env` file in the **`backend/`** directory to store configuration secrets (e.g., Database URI, API keys, etc.).
    ```
    # Example for backend/.env
    PORT=5000
    MONGO_URI='<YOUR_MONGODB_CONNECTION_STRING>'
    # Add any other necessary secrets like JWT_SECRET for authentication
    ```

3.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

4.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend Server (API):**
    From the `backend/` directory:
    ```bash
    npm start 
    # Or, if using a common development script like nodemon:
    # npm run dev 
    ```
    The server should start (typically on `http://localhost:5000`).

2.  **Start the Frontend Client:**
    From the `frontend/` directory:
    ```bash
    npm start 
    ```
    The frontend application will start (typically on `http://localhost:3000`) and should automatically open in your browser. It will connect to the backend server to fetch and save data.

## 🔗 Live Demo

The application is deployed and available for use here:

**[https://expense-tracker-evaao.vercel.app](https://expense-tracker-evaao.vercel.app)**
