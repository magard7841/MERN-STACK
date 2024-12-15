const express = require('express');
const { getUsers, createUser } = require('../controllers/userController');
const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   fullName:
 *                     type: string
 *                   email:
 *                     type: string
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create User
 *     description: Creates a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Bad request (missing fields or invalid data)
 *       500:
 *         description: Internal server error
 */
router.post('/', createUser);

module.exports = router;
