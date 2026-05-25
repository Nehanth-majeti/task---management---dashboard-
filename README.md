# 📝 Taskly - Task Management Dashboard

Taskly is a **complete, secure, and visually stunning** web application for personal task management. Built with a robust **Node.js/Express** backend and a high-performance **React/Vite** frontend, it features dynamic analytics, global searches, compound filters, sorting mechanisms, and secure JWT authentication with full multi-user isolation.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![License](https://img.shields.io/badge/license-ISC-blue)
![Node.js](https://img.shields.io/badge/node.js-v16+-brightgreen)
![React](https://img.shields.io/badge/react-v18+-blue)

---

## ✨ Features

### 🔒 **Secure Authentication**
- User sign-up & log-in protected with **bcrypt** password hashing
- JWT token-based sessions (30-day expiration)
- Secure token management with localStorage
- Automatic session restoration on page reload

### 🛡️ **Complete Privacy**
- Database records fully isolated per user
- Server-side filtering ensures no data leaks
- Protected API routes with JWT middleware
- Ownership verification on all operations

### 📊 **Real-time Dashboard Metrics**
- **Total Tasks:** Count of all tasks
- **Completed:** Tasks marked as done
- **Active Tasks:** Pending + In Progress tasks
- **Overdue Tasks:** Incomplete tasks past due date
- Real-time updates on every change

### ⚡ **Advanced Task CRUD**
- **Create tasks** with title, description, priority, due date
- **Edit existing tasks** instantly
- **Delete tasks** with confirmation
- **Change status** (Pending → In Progress → Completed)
- **Priority levels** (Low, Medium, High)
- **Due date tracking** with overdue detection

### 🔍 **Intelligent Search & Filtering**
- Case-insensitive search across titles and descriptions
- Filter by status (All, Pending, In Progress, Completed)
- Filter by priority (All, Low, Medium, High)
- Multiple filters work together
- Sort by due date (Soonest/Latest) or created date
- Debounced search for performance

### 💅 **Premium UI & Design**
- Dark theme with glassmorphism design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Lucide React icons
- Form validation with feedback
- Toast notifications
- Loading states

---

## 🚀 Quick Start

### Prerequisites
- Node.js v16+ with npm
- 5 minutes to set up

### Installation

```bash
# Backend setup
cd backend
npm install
npm run seed  # Load sample data
npm run dev   # Runs on http://localhost:5000

# Frontend setup (in new terminal)
cd frontend
npm install
npm run dev   # Opens http://localhost:3000
```

**Test Login:**
- Email: `jane@example.com`
- Password: `password123`

**[→ Full Setup Guide](./SETUP.md)**

---

## 📂 Project Structure

```
task-management-dashboard/
├── frontend/                      # React + Vite (Port 3000)
│   ├── src/
│   │   ├── components/           # UI Components
│   │   │   ├── Navbar.jsx        # Navigation header
│   │   │   ├── TaskCard.jsx      # Task display card
│   │   │   ├── TaskForm.jsx      # Create/edit modal
│   │   │   └── StatsGrid.jsx     # Dashboard stats
│   │   ├── pages/                # Pages
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Sign up page
│   │   │   └── Dashboard.jsx     # Main dashboard
│   │   ├── context/              # Global state
│   │   │   └── AuthContext.jsx   # Auth management
│   │   ├── services/             # API client
│   │   │   └── api.js            # Axios instance
│   │   ├── styles/               # CSS
│   │   │   └── index.css         # Global styles
│   │   ├── App.jsx               # Router
│   │   └── main.jsx              # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                       # Node + Express (Port 5000)
│   ├── controllers/              # Business logic
│   │   ├── authController.js     # Auth endpoints
│   │   └── taskController.js     # Task endpoints
│   ├── routes/                   # API routes
│   │   ├── authRoutes.js         # Auth routes
│   │   └── taskRoutes.js         # Task routes
│   ├── middleware/               # Custom middleware
│   │   └── auth.js               # JWT verification
│   ├── models/                   # Data schemas
│   │   ├── User.js               # User model
│   │   └── Task.js               # Task model
│   ├── config/                   # Configuration
│   │   ├── db.js                 # MongoDB config
│   │   └── jsonDb.js             # JSON DB handler
│   ├── scripts/                  # Utilities
│   │   └── seed.js               # Database seeding
│   ├── server.js                 # Express app
│   ├── .env                      # Environment variables
│   └── package.json
│
├── database/                      # Data storage
│   ├── db.json                   # JSON database
│   ├── sample-data.json          # Sample data
│   └── schema.md                 # Schema docs
│
├── SETUP.md                      # Setup guide
└── README.md                     # This file
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register     Register new user
POST   /api/auth/login        Login and get token
GET    /api/auth/profile      Get user profile (Protected)
```

### Tasks (All Protected)
```
GET    /api/tasks             Get all tasks
POST   /api/tasks             Create task
PUT    /api/tasks/:id         Update task
DELETE /api/tasks/:id         Delete task
GET    /api/tasks/stats       Get dashboard stats
```

**Query Parameters for GET /api/tasks:**
- `search` - Search in title/description
- `status` - Filter by status
- `priority` - Filter by priority
- `sort` - Sort method

---

## 🛠️ Tech Stack

### Frontend
- React 18 - UI library
- Vite - Build tool
- React Router v6 - Routing
- Axios - HTTP client
- Lucide React - Icons
- Vanilla CSS - Styling

### Backend
- Node.js - Runtime
- Express - Web framework
- JWT - Authentication
- bcryptjs - Password hashing
- JSON Database - Data storage

---

## 🔐 Security

✅ **Password Security**
- bcryptjs with 10 salt rounds
- Never stored in plain text
- Minimum 6 characters

✅ **Authentication**
- JWT token validation
- 30-day expiration
- Secure token storage
- Auto logout on expiration

✅ **Data Privacy**
- Server-side user filtering
- Ownership verification
- No cross-user data access

✅ **Input Validation**
- Server-side validation
- Email format checking
- Required field validation

---

## 📖 Usage Guide

### Create an Account
1. Visit `/register`
2. Enter name, email, password
3. Auto-redirects to dashboard

### Login
1. Visit `/login`
2. Enter email and password
3. Token saved to localStorage

### Create a Task
1. Click "New Task" button
2. Enter title (required)
3. Add description (optional)
4. Select priority and due date
5. Click "Create Task"

### Edit a Task
1. Hover over task card
2. Click pencil icon
3. Modify fields
4. Click "Save Changes"

### Delete a Task
1. Hover over task card
2. Click trash icon
3. Confirm deletion

### Quick Actions
- **Change Status:** Click status dropdown on card
- **Search:** Type in search box
- **Filter:** Use status/priority selectors
- **Sort:** Choose sort method

---

## ⚙️ Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=supersecret_jsonwebtoken_key_change_me_in_production
MONGODB_URI=mongodb://127.0.0.1:27017/task_management_db
```

### Frontend (vite.config.js)
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000'
    }
  }
}
```

---

## 🚀 Running the Application

### Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Open http://localhost:3000
```

### Production
```bash
cd frontend
npm run build

cd ../backend
npm start
```

---

## 🌱 Database Seeding

```bash
cd backend
npm run seed
```

Creates:
- 2 test users with sample tasks
- 4 sample tasks for demonstration

**Test Credentials:**
```
jane@example.com / password123
john@example.com / password123
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | Change PORT in .env or vite.config.js |
| CORS errors | Ensure backend is running on :5000 |
| Login fails | Clear localStorage, check .env JWT_SECRET |
| Database error | Restart backend, database auto-initializes |
| Missing seed data | Run `npm run seed` from backend |

---

## 📊 Sample Data

### User Schema
```json
{
  "_id": "user_123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "bcrypt_hashed_password",
  "createdAt": "2026-05-24T10:00:00.000Z"
}
```

### Task Schema
```json
{
  "_id": "task_123",
  "user": "user_123",
  "title": "Complete project",
  "description": "Finish requirements",
  "status": "In Progress",
  "priority": "High",
  "dueDate": "2026-05-30T12:00:00.000Z",
  "createdAt": "2026-05-24T10:00:00.000Z",
  "updatedAt": "2026-05-24T11:30:00.000Z"
}
```

---

## 📝 API Examples

### Register
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

### Get Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"New Task",
    "priority":"High",
    "dueDate":"2026-05-30T12:00:00.000Z"
  }'
```

---

## 📄 License

ISC License - Open source and free to use

---

## 🤝 Support

For help:
1. Check [SETUP.md](./SETUP.md) for detailed setup
2. Review console logs for errors
3. Verify Node.js and npm versions
4. Check .env file configuration
5. Ensure ports 5000 and 3000 are available

---

## ✅ Pre-Launch Checklist

- [ ] Node.js v16+ installed
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file configured
- [ ] Sample data seeded
- [ ] Backend server running on :5000
- [ ] Frontend dev server running on :3000
- [ ] Can access http://localhost:3000
- [ ] Test login works
- [ ] Can create/edit/delete tasks

---

## 🎉 Get Started

```bash
cd backend && npm run dev    # Terminal 1
cd frontend && npm run dev   # Terminal 2
# Open http://localhost:3000
```

For detailed setup instructions, see **[SETUP.md](./SETUP.md)**

**Happy Task Managing!** 📝✨
