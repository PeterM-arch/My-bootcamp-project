# Coffee Brew Log Application

A full-stack web application designed to log, track, and monitor daily coffee brewing iterations. Built as part of the XPL Full-stack developer project assessment constraints.

## 🚀 Core Features & Mission Requirements
- **Persistent Storage:** Full CRUD operations backed by an SQLite SQL database using the Sequelize ORM framework.
- **Dynamic Interface:** Auto-calculating browser context page tab title displaying total logs (`Brews: {count}`) updated live.
- **Robust Client Validation:** Restricts and completely blocks empty form payloads from hitting backend execution blocks.
- **Modern Security Hygiene:** Enabled Cross-Origin Resource Sharing (CORS) middleware to prevent unauthorized port-level handshakes.

## 🛠️ Tech Stack Architecture
- **Frontend:** Vanilla ECMAScript JavaScript, HTML5 semantic structure, and responsive grid layouts.
- **Backend:** Node.js, Express.js REST API framework context execution.
- **Database layer:** Sequelize ORM mapping SQLite database engines.

## 🔌 API Documentation & Endpoints

### 1. Fetch All Brew Logs
- **Endpoint:** `GET /api/brews`
- **Response Status:** `200 OK`
- **Payload Return:** Array of all logged coffee records.

### 2. Log a New Coffee Brew Entry
- **Endpoint:** `POST /api/brews`
- **Headers:** `Content-Type: application/json`
- **Response Status:** `201 Created` / `400 Bad Request`
- **Required Body Payload JSON Structure:**
```json
{
  "title": "Ethiopian Yirgacheffe",
  "method": "V60 Pourover",
  "coffeeGrams": 18,
  "waterGrams": 250,
  "rating": 5,
  "tastingNotes": "Fruity and bright"
}
```

## 💻 Local Setup & Installation Instructions

### Prerequisites
Ensure you have [Node.js](https://nodejs.org) runtime environments downloaded onto your machine.

### Backend Setup
1. Open a terminal instance and navigate to the backend folder context:
   ```bash
   cd backend
   ```
2. Install all required Sequelize, Express, and Database driver modules:
   ```bash
   npm install
   ```
3. Initialize the server runtime environment:
   ```bash
   node index.js
   ```

### Frontend Setup
1. Open the `frontend` folder workspace using a local server engine like the **VS Code Live Server Extension**.
2. Launch `index.html` via port `5500` to interact with the full-stack database wrapper safely.

