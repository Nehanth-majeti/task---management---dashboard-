const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../../database/db.json');

const readDb = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      const dir = path.dirname(dbPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // Set initial structure with standard seed user
      const initialData = {
        users: [
          {
            _id: "user_seed_jane",
            name: "Jane Doe",
            email: "jane@example.com",
            password: "$2a$10$UnC3aYjQzC8hXf7p0Z/3ueC1gW93ZlqW/vP1gMvN9o.vA/tO2s61i" // password123
          }
        ],
        tasks: [
          {
            _id: "task_seed_1",
            user: "user_seed_jane",
            title: "Design Dashboard Mockups",
            description: "Create high-fidelity landing page and dashboard screen visuals with dark/light themes.",
            status: "In Progress",
            priority: "High",
            dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
          },
          {
            _id: "task_seed_2",
            user: "user_seed_jane",
            title: "Review Marketing Strategy",
            description: "Prepare notes for next week's presentation on digital customer outreach campaigns.",
            status: "Pending",
            priority: "Medium",
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
          }
        ]
      };
      fs.writeFileSync(dbPath, JSON.stringify(initialData, null, 2), 'utf8');
      return initialData;
    }
    const fileContent = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('JSON DB Read Error:', error.message);
    return { users: [], tasks: [] };
  }
};

const writeDb = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('JSON DB Write Error:', error.message);
  }
};

module.exports = { readDb, writeDb };
