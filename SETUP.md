# 🚀 Task Management Dashboard - Setup & Deployment Guide

## Project Overview

**Taskly** is a complete, secure, and visually stunning task management web application built with:
- **Backend:** Node.js + Express.js + JSON Database
- **Frontend:** React + Vite + React Router
- **Authentication:** JWT with bcrypt password hashing
- **Styling:** Modern CSS with glassmorphism design

---

## 📋 Prerequisites

Before you start, ensure you have installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

Verify installation:
```bash
node --version
npm --version
```

---

## 🛠️ Project Structure

```
task-management-dashboard/
├── backend/                      # Node.js/Express API
│   ├── config/                   # Configuration files
│   │   ├── db.js                 # MongoDB connection (fallback)
│   │   └── jsonDb.js             # JSON Database handler
│   ├── controllers/              # Business logic
│   │   ├── authController.js     # Auth endpoints
│   │   └── taskController.js     # Task CRUD endpoints
│   ├── middleware/               # Custom middleware
│   │   └── auth.js               # JWT authentication
│   ├── models/                   # Data models
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js         # /api/auth routes
│   │   └── taskRoutes.js         # /api/tasks routes
│   ├── scripts/                  # Utility scripts
│   │   └── seed.js               # Database seeding
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express app entry point
│   └── package.json              # Dependencies
│
├── frontend/                     # React + Vite application
│   ├── src/
│   │   ├── components/           # Reusable React components
│   │   │   ├── Navbar.jsx        # Header/navigation
│   │   │   ├── TaskCard.jsx      # Individual task component
│   │   │   ├── TaskForm.jsx      # Task creation/edit modal
│   │   │   └── StatsGrid.jsx     # Dashboard statistics
│   │   ├── context/              # Global state management
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/                # Page components
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── Dashboard.jsx     # Main dashboard
│   │   ├── services/             # API services
│   │   │   └── api.js            # Axios instance with interceptors
│   │   ├── styles/               # Styling
│   │   │   └── index.css         # Global styles
│   │   ├── App.jsx               # App router
│   │   └── main.jsx              # Entry point
│   ├── index.html                # HTML template
│   ├── vite.config.js            # Vite configuration
│   ├── package.json              # Dependencies
│   └── public/                   # Static assets
│
├── database/                     # Database files
│   ├── db.json                   # JSON database (auto-created)
│   ├── sample-data.json          # Sample data
│   └── schema.md                 # Schema documentation
│
├── .env.example                  # Environment variable template
├── README.md                     # Project documentation
├── SETUP.md                      # This file
└── package.json                  # Root package (optional)
```

---

## ⚙️ Installation Steps

### Step 1: Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

The backend uses a JSON database by default. The database file (`db.json`) will be created automatically in the `database/` folder when you first run the server.

### Step 2: Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

---

## 🔐 Environment Configuration

### Backend Environment Variables

The `.env` file is already configured in the backend. It contains:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_management_db
JWT_SECRET=supersecret_jsonwebtoken_key_change_me_in_production
NODE_ENV=development
```

**For Production:** Update `JWT_SECRET` to a strong, random string:
```bash
# Generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Frontend Configuration

The frontend is configured to use the backend API at `http://localhost:5000/api` via the `vite.config.js` proxy.

---

## 🌱 Database Seeding

To populate the database with sample data and test credentials, run:

```bash
cd backend
npm run seed
```

This will create:
- **2 test users** with sample tasks
- **4 sample tasks** for demonstration

**Test Credentials:**
```
Email: jane@example.com
Password: password123

Email: john@example.com
Password: password123
```

---

## 🚀 Running the Application

### Option 1: Run Both Servers (Recommended for Development)

Open two terminal windows:

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
# App opens at http://localhost:3000
```

### Option 2: Run Backend Only (Production Mode)

```bash
cd backend
npm start
```

---

## ✨ Key Features & How to Use

### Authentication
1. **Register:** Create a new account at `/register`
2. **Login:** Sign in with your email and password at `/login`
3. **Session:** Automatically maintained with JWT tokens in localStorage

### Dashboard
1. **View Tasks:** All your personal tasks appear in the grid
2. **Create Tasks:**
   - Click "New Task" button
   - Fill in title, description, due date, priority, status
   - Submit to create

3. **Edit Tasks:**
   - Click the edit icon (pencil) on any task
   - Update fields in the modal
   - Save changes

4. **Delete Tasks:**
   - Click the delete icon (trash) on any task
   - Confirm deletion

5. **Change Task Status:**
   - Use the dropdown on each task card
   - Options: Pending, In Progress, Completed

### Filtering & Search
- **Search:** Type in the search box to find tasks by title or description
- **Filter by Status:** View Pending, In Progress, or Completed tasks
- **Filter by Priority:** View Low, Medium, or High priority tasks
- **Sort:** Order tasks by due date (Soonest/Latest) or creation date

### Dashboard Statistics
View real-time metrics:
- **Total Tasks:** All tasks you've created
- **Completed:** Tasks marked as done
- **Active Tasks:** Pending + In Progress tasks
- **Overdue:** Tasks past their due date (not completed)

---

## 🔧 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user profile (Protected)

### Task Endpoints (All Protected - Require JWT Token)
- `GET /api/tasks` - Get all user tasks (with filters)
  - Query params: `search`, `status`, `priority`, `sort`
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get dashboard statistics

---

## 📦 Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

Output files will be in `frontend/dist/`

### Serve Production Build
```bash
# From backend directory
cd backend
npm start
```

Then use a reverse proxy (nginx) or deployment platform to serve both frontend and backend.

---

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:

**For Backend (port 5000):**
```env
PORT=5001
```

**For Frontend (port 3000):**
Update `vite.config.js`:
```javascript
server: {
  port: 3001,
  ...
}
```

### CORS Errors
Ensure the backend is running and accessible. The Vite dev server proxies API requests automatically.

### Authentication Failures
1. Check `.env` file has correct `JWT_SECRET`
2. Ensure tokens aren't corrupted in localStorage
3. Clear browser cache and localStorage

```javascript
// In browser console:
localStorage.clear();
location.reload();
```

### Database Not Found
The JSON database auto-initializes. If issues persist:
1. Delete `database/db.json`
2. Restart backend server
3. Run `npm run seed` to add sample data

---

## 📚 API Examples

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"Learn Node.js",
    "description":"Complete Node.js tutorial",
    "priority":"High",
    "dueDate":"2026-05-30T12:00:00.000Z"
  }'
```

### Get All Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🎨 UI/UX Features

- **Dark Theme:** Beautiful dark mode with glassmorphism design
- **Responsive Design:** Works on mobile, tablet, and desktop
- **Smooth Animations:** Fade-in, slide-up, and hover effects
- **Icons:** Using Lucide React for modern icons
- **Toast Notifications:** Instant feedback for actions
- **Form Validation:** Real-time input validation
- **Loading States:** Visual feedback during async operations

---

## 🔒 Security Features

- **Password Hashing:** bcryptjs with 10 salt rounds
- **JWT Authentication:** Secure token-based sessions
- **Protected Routes:** Frontend route protection
- **Token Expiration:** 30-day token lifetime
- **CORS Enabled:** Secure cross-origin requests
- **Input Validation:** Server-side validation on all endpoints

---

## 📝 Database Schema

### Users Collection (JSON)
```json
{
  "_id": "unique_user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password",
  "createdAt": "2026-05-24T10:00:00.000Z"
}
```

### Tasks Collection (JSON)
```json
{
  "_id": "unique_task_id",
  "user": "user_id",
  "title": "Complete project",
  "description": "Finish all requirements",
  "status": "Pending",
  "priority": "High",
  "dueDate": "2026-05-30T12:00:00.000Z",
  "createdAt": "2026-05-24T10:00:00.000Z",
  "updatedAt": "2026-05-24T10:00:00.000Z"
}
```

---

## 📄 License

This project is open source and available under the ISC License.

---

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review console logs for error messages
3. Verify all prerequisites are installed
4. Ensure environment variables are set correctly

---

## ✅ Verification Checklist

Before deploying, ensure:

- [ ] Node.js and npm are installed
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` file configured correctly
- [ ] Database seeding completed (`npm run seed`)
- [ ] Backend server starts without errors
- [ ] Frontend development server starts without errors
- [ ] Can register a new user
- [ ] Can login with test credentials
- [ ] Dashboard loads with tasks
- [ ] Can create/edit/delete tasks
- [ ] Search and filters work correctly

---

## 🎉 You're All Set!

Your Task Management Dashboard is ready to use. Start with:

```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev

# Open http://localhost:3000
```

Happy task managing! 📝✨
