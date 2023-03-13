const express = require("express");
const router = express.Router(); 

//* Requiring Middlwares
const { isAdmin, mid } = require("../middleware/auth");

//* Requiring Controller
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

//* Destructuring All Controllers
const { registerUser, loginUser ,allUser} = userController;
const { createProduct, getAllProducts, getProductById, deleteProduct,updateProduct}=productController;

//* Test Api
router.get("/", (req, res) => res.send("Hello World!"));

//* Resiter APi
router.post("/register", registerUser);

//* Login Api
router.post("/login", loginUser);

//* All Users 
router.get("/users",mid, isAdmin(["admin"]),allUser)

//* The Api for product creation only for ADMIN
router.post("/product", mid, isAdmin(["admin"]), createProduct);

//* the Api for get all the products for Public
router.get("/products", getAllProducts);

router.put("/product/:id", mid, isAdmin(["admin"]), updateProduct);

//* The Api for product Deletion only for ADMIN
router.delete("/product/:id", mid, isAdmin(["admin"]), deleteProduct);



                  //* ALL SWAGGER DOC IS HERE

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - Check Api
 *     summary: Check the application
 *     description: Check API
 *     responses:
 *       200:
 *         description: A successful response
 */


//* User Register Docs

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Register
 *     summary: Register a new user
 *     description: Register a new user with the given details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ['user', 'admin']
 *                 default: 'user'
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */



//* user Login docs
/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Login a user
 *     description: Login a user with the given email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */


//* All Users

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserList'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */


//* product schema ref
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the product.
 *         description:
 *           type: string
 *           description: A description of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *       example:
 *         name: Example Product
 *         description: This is an example product.
 *         price: 9.99
 */


//* product schema ref
/**
 * @swagger
 * components:
 *   schemas:
 *     ProductOutput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The ID of the created product.
 *         name:
 *           type: string
 *           description: The name of the created product.
 *         description:
 *           type: string
 *           description: The description of the created product.
 *         price:
 *           type: number
 *           description: The price of the created product.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the product was created.
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp of when the product was last updated.
 */


//* product creation docs
/**
 * @swagger
 * /product:
 *   post:
 *     tags:
 *       -  Create Product
 *     summary: Create a new product
 *     description: Create a new product with the given details
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       201:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOutput'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */


//*  Errors and acception docs
/**
 * @swagger
 * components:
 *   responses:
 *     BadRequest:
 *       description: Bad request error response
 *       content:
 *         application/json
 */

/**
 * @swagger
 * components:
 *   responses:
 *      Unauthorized:
 *       description: Unauthorized error response
 *       content:
 *         application/json
 */

/**
 * @swagger
 *  components:
 *       responses:
 *          InternalServerError:
 *           description: Internal server error response
 *           content:
 *              application/json
 */


//*get products

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of all products.
 *     description: This endpoint retrieves a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error.
 */


//* Product Update Docs

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     tags:
 *       - Update Product
 *     summary: Update a product
 *     description: Update an existing product with the given details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOutput'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


//* Product Delete Docs 

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     tags:
 *       - Delete Product
 *     summary: Delete a product
 *     description: Delete an existing product
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: A successful response with no content
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: An error occurred
 * /product/{id}:
 *   put:
 *     tags:
 *       -  Update Product
 *     summary: Update a product by ID
 *     description: Update the product with the given ID with the new details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductOutput'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   delete:
 *     tags:
 *       -  Delete Product
 *     summary: Delete a product by ID
 *     description: Delete the product with the given ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */


module.exports = router;
