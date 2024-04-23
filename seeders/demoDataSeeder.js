const db = require("../models");

const users = [
  {
    name: "John Doe",
    phoneNumber: "1234567890",
    password: "hashedpassword",
    email: "john@example.com",
  },
  {
    name: "Jane Doe",
    phoneNumber: "0987654321",
    password: "hashedpassword",
    email: "jane@example.com",
  },
];

const contacts = [
  { name: "John Doe", phoneNumber: "1234567890", userId: 1 },
  { name: "Jane Smith", phoneNumber: "1122334455", userId: 1, isSpam: true },
  { name: "Emily Doe", phoneNumber: "2233445566", userId: 2 },
];

async function seedDB() {
  await db.sequelize.sync({ force: true });

  await db.users.bulkCreate(
    users.map((user) => ({
      ...user,
      password: require("bcrypt").hashSync(user.password, 10),
    }))
  );

  await db.contacts.bulkCreate(contacts);
}

seedDB().then(() => {
  console.log("Data seeded successfully");
  process.exit();
});
