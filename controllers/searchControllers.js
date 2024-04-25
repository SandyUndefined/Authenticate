const db = require("../models");

exports.searchByName = async (req, res) => {
  try {
    const { name } = req.query;

    // Check if the name parameter is provided in the query string
    if (!name) {
      return res.status(400).send({ message: "Name parameter is required" });
    }

    const results = await db.users.findAll({
      where: db.Sequelize.where(
        db.Sequelize.fn("LOWER", db.Sequelize.col("contacts.name")),
        "LIKE",
        `%${name.toLowerCase()}%`
      ),
      include: [
        {
          model: db.contacts,
          as: "contacts",
          attributes: ["name", "phoneNumber", "isSpam"],
        },
      ],
    });

    const sortedResults = results.sort((a, b) => {
      if (
        a.name.toLowerCase().startsWith(name.toLowerCase()) &&
        !b.name.toLowerCase().startsWith(name.toLowerCase())
      ) {
        return -1;
      }
      if (
        !a.name.toLowerCase().startsWith(name.toLowerCase()) &&
        b.name.toLowerCase().startsWith(name.toLowerCase())
      ) {
        return 1;
      }
      return 0;
    });

    res.status(200).send(sortedResults);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error searching for names", error: error.message });
  }
};

exports.searchByPhoneNumber = async (req, res) => {
  console.log(req.query);
  try {
    const { phoneNumber } = req.query;
    const results = await db.users.findAll({
      where: { phoneNumber: "users.phoneNumber" },
      include: [
        {
          model: db.contacts,
          as: "contacts",
          attributes: ["name", "phoneNumber", "isSpam"],
        },
      ],
    });

    if (results.length === 0) {
      const contactResults = await db.contacts.findAll({
        where: { phoneNumber: phoneNumber },
        include: [
          {
            model: db.users,
            as: "user",
            attributes: ["name"],
          },
        ],
      });
      return res.status(200).send(contactResults);
    }

    res.status(200).send(results);
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error searching by phone number",
        error: error.message,
      });
  }
};

exports.markAsSpam = async (req, res) => {
  try {
    const { phoneNumber,name } = req.body;
    const [contact, created] = await db.contacts.findOrCreate({
      where: { phoneNumber },
      defaults: { name,phoneNumber,isSpam: true },
    });

    if (!created) {
      contact.isSpam = true;
      await contact.save();
    }

    res
      .status(200)
      .send({ message: "Number marked as spam successfully", phoneNumber });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error marking number as spam", error: error.message });
  }
};
