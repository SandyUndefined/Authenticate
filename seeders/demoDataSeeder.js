const db = require("../models");

const users = [
  {
    name: "Sandeep",
    phoneNumber: "7318724249",
    password: "@Sandy098",
    email: "sk@gmail.com",
  },
  {
    name: "Sandy",
    phoneNumber: "7001441439",
    password: "@Sandy098",
    email: "sk12@gmail.com",
  },
];

const contacts = [
  { name: "Suraj", phoneNumber: "1234567890", userId: 1 },
  { name: "Daddy", phoneNumber: "1122334455", userId: 1, isSpam: true },
  { name: "Twitter", phoneNumber: "2233445566", userId: 2 },
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
