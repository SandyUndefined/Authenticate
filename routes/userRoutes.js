
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in with a phone number and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               phoneNumber: "+1234567890"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Allows a new user to register with their name, phone number, optional email, and password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phoneNumber
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: The full name of the user.
 *               phoneNumber:
 *                 type: string
 *                 description: The unique phone number of the user.
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: "email@example.com"
 *               password:
 *                 type: string
 *                 description: The password for the user account.
 *                 example: "your_secure_password"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Error occurred during the registration process
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error registering new user"
 *                 error:
 *                   type: string
 *                   example: "Database error details here"
 */
const express = require("express");
const { register, login } = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
