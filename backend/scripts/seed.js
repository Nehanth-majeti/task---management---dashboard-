const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const { readDb, writeDb } = require('../config/jsonDb');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Load sample data from JSON file
    const sampleDataPath = path.join(__dirname, '../../database/sample-data.json');
    if (!fs.existsSync(sampleDataPath)) {
      throw new Error(`Sample data file not found at ${sampleDataPath}`);
    }

    const sampleData = JSON.parse(fs.readFileSync(sampleDataPath, 'utf8'));

    // Create users with hashed passwords
    console.log('👤 Creating seed users...');
    const usersMap = {}; // mapping email -> userId

    const seedUsers = [
      { name: 'Jane Doe', email: 'jane@example.com', password: 'password123' },
      { name: 'John Smith', email: 'john@example.com', password: 'password123' }
    ];

    const users = [];
    for (const u of seedUsers) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(u.password, salt);
      
      const newUser = {
        _id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        name: u.name,
        email: u.email.toLowerCase(),
        password: hashedPassword,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      usersMap[newUser.email] = newUser._id;
      console.log(`  ✓ Created user: ${newUser.name} (${newUser.email})`);
    }

    // Create seed tasks
    console.log('📝 Creating seed tasks...');
    const tasks = [];
    
    const seedTasks = [
      {
        userEmail: 'jane@example.com',
        title: 'Design Dashboard Mockups',
        description: 'Create high-fidelity landing page and dashboard screen visuals with dark/light themes.',
        status: 'In Progress',
        priority: 'High',
        dueDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userEmail: 'jane@example.com',
        title: 'Set up Database Schemas',
        description: 'Define models for User and Task collections and setup connection logic.',
        status: 'Completed',
        priority: 'High',
        dueDate: new Date().toISOString()
      },
      {
        userEmail: 'jane@example.com',
        title: 'Integrate JWT Middleware',
        description: 'Add token validation routes and secure backend tasks API paths.',
        status: 'Pending',
        priority: 'Medium',
        dueDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        userEmail: 'john@example.com',
        title: 'Review Marketing Strategy',
        description: 'Prepare notes for next week\'s presentation on digital customer outreach campaigns.',
        status: 'Pending',
        priority: 'Low',
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    for (const t of seedTasks) {
      const userId = usersMap[t.userEmail];
      if (!userId) {
        console.warn(`  ⚠ User ${t.userEmail} not found, skipping task`);
        continue;
      }

      const newTask = {
        _id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        user: userId,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      tasks.push(newTask);
      console.log(`  ✓ Created task: "${newTask.title}" for ${t.userEmail}`);
    }

    // Write seeded data to JSON database
    const db = {
      users,
      tasks
    };

    writeDb(db);
    console.log('\n✅ Database seeded successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`  • Users created: ${users.length}`);
    console.log(`  • Tasks created: ${tasks.length}`);
    console.log(`\n🔐 Test Credentials:`);
    console.log(`  Email: jane@example.com`);
    console.log(`  Password: password123`);
    console.log(`\n  Email: john@example.com`);
    console.log(`  Password: password123`);

  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

// Run seeding
seedDatabase();
