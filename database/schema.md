# Database Schema Specs

This document outlines the schema specifications for the Task Management Dashboard MongoDB collections.

## 1. Users Collection (`users`)

Stores user credentials and registration details.

```json
{
  "_id": "ObjectId",
  "name": { "type": "String", "required": true, "trim": true },
  "email": { "type": "String", "required": true, "unique": true, "lowercase": true, "trim": true },
  "password": { "type": "String", "required": true, "minlength": 6 },
  "createdAt": "Date (Timestamp)",
  "updatedAt": "Date (Timestamp)"
}
```

* **Indexes:**
  * `email`: Unique index to enforce email uniqueness and speed up logins.

---

## 2. Tasks Collection (`tasks`)

Stores user-created tasks. Each task is linked to its owner via a reference to the `users` collection.

```json
{
  "_id": "ObjectId",
  "user": { "type": "ObjectId", "ref": "User", "required": true },
  "title": { "type": "String", "required": true, "trim": true },
  "description": { "type": "String", "trim": true },
  "status": {
    "type": "String",
    "enum": ["Pending", "In Progress", "Completed"],
    "default": "Pending"
  },
  "priority": {
    "type": "String",
    "enum": ["Low", "Medium", "High"],
    "default": "Medium"
  },
  "dueDate": { "type": "Date", "required": true },
  "createdAt": "Date (Timestamp)",
  "updatedAt": "Date (Timestamp)"
}
```

* **Indexes:**
  * `user`: Single-field index to optimize retrieval of tasks for a logged-in user.
  * `user`, `status`: Compound index for filtering tasks by status.
  * `user`, `priority`: Compound index for filtering tasks by priority.
  * `user`, `dueDate`: Compound index for sorting tasks by due date.
