/**
 * @swagger
 * /api/search/name/name:
 *   get:
 *     summary: Search users by name
 *     description: Retrieves a list of users whose names contain the query string, prioritizing those who start with it.
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Partial or full name to search for
 *     responses:
 *       200:
 *         description: An array of users and their contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *       500:
 *         description: Failed to retrieve results
 *         content:
 *           application/json:
 *             schema:
 */

/**
 * @swagger
 * /api/search/phone/phone:
 *   get:
 *     summary: Search by phone number
 *     description: Retrieves users or contacts matching the given phone number.
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: phoneNumber
 *         required: true
 *         schema:
 *           type: string
 *         description: The phone number to search for
 *     responses:
 *       200:
 *         description: An array of users or contacts associated with the phone number
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Failed to retrieve results
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/search/spam:
 *   post:
 *     summary: Mark a phone number as spam
 *     description: Marks a specified phone number as spam. If the number does not exist, it is added as a spam contact.
 *     tags: [Spam]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number to be marked as spam
 *                 example: "+1234567890"
 *     responses:
 *       200:
 *         description: Phone number marked as spam successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Number marked as spam successfully"
 *                 phoneNumber:
 *                   type: string
 *                   example: "+1234567890"
 *       500:
 *         description: Error marking the number as spam
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const express = require("express");
const {
  searchByName,
  searchByPhoneNumber,
  markAsSpam,
} = require("../controllers/searchControllers");
const { verifyToken } = require("../middlewares/auth");
const router = express.Router();

router.get("/name:name", verifyToken, searchByName);
router.get("/phone:phone", verifyToken, searchByPhoneNumber);
router.post("/spam", verifyToken, markAsSpam);

module.exports = router;
