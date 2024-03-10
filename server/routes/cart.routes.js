// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Carts:
//  *       type: object
//  *       required:
//  *         - product_id
//  *         - name
//  *         - price
//  *         - email
//  *         - image
//  *         - quantity
//  *       properties:
//  *         product_id:
//  *           type: string
//  *           description: The id of the Cart
//  *         name:
//  *           type: string
//  *           description: The name of the Cart
//  *         price:
//  *           type: number
//  *           description: The price of the Cart
//  *         email:
//  *           type: string
//  *           description: The email of the Cart
//  *         image:
//  *           type: string
//  *           description: The image of the Cart
//  *         quantity:
//  *           type: integer
//  *           description: The quantity of the Cart
//  *       example:
//  *         product_id: "65e8389ff1faf9503ce69893"
//  *         name: "Test"
//  *         email: "aumnatthacha@gmail.com"
//  *         price: 3000
//  *         image: "http://example.com/macbook.jpg"
//  *         quantity: 6
//  *   tags:
//  *     - name: Carts
//  *       description: API for managing carts
//  */
// const express = require("express");
// const router = express.Router();
// const cartModel = require("../models/Carts.model");

// /**
//  * @swagger
//  * /carts:
//  *   get:
//  *     summary: Retrieve a list of products
//  *     tags: [Carts]
//  *     responses:
//  *       200:
//  *         description: A list of carts.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Carts'
//  *       500:
//  *         description: Some error happened
//  */
// // router.get("/", async (req, res) => {
// //   try {
// //     const carts = await cartModel.find();
// //     res.status(200).json(carts);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // });

// router.get("/" , async (req,res) => {
//   try {
//     const products = await CartsModel.find();
//         res.status(200).json(products)
//   } catch (error) {
//     res.status(500).json({message:error.message})
//   }  
// })

// /**
//  * @swagger
//  * /Carts/{email}:
//  *   get:
//  *     summary: Get cart by email
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: email
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The cart email
//  *     responses:
//  *       200:
//  *         description: The Cart by email.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Carts'
//  *       404:
//  *         description: Cart Not Found
//  *       500:
//  *         description: Some error happened
//  */
// router.get("/:email", async (req, res) => {
//   try {
//     const userEmail = req.params.email;
//     const userCarts = await CartsModel.find({ email: userEmail }); // ใช้ find แทน findOne เพื่อให้ได้รายการทั้งหมดที่ตรงกับ email

//     if (!userCarts || userCarts.length === 0) {
//       return res.status(404).json({ message: "ไม่พบสินค้า" });
//     }

//     res.status(200).json(userCarts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /**
//  * @swagger
//  * /Carts:
//  *   post:
//  *     summary: Create a new Cart or increment quantity by 1 if the product already exists
//  *     tags: [Carts]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Carts'
//  *     responses:
//  *       201:
//  *         description: The Cart created or quantity incremented successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Carts'
//  *       500:
//  *         description: Some error happened
//  */
// router.post("/", async (req, res) => {
//   const { product_id } = req.body;
//   try {
//     const existingCart = await cartModel.findOne({ product_id });

//     if (existingCart) {
//       existingCart.quantity += 1;
//       const updatedCart = await existingCart.save();
//       res.status(201).json(updatedCart);
//     } else {
//       const newCart = new cartModel({ ...req.body, quantity: 1 });
//       const cart = await newCart.save();
//       res.status(201).json(cart);
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /**
//  * @swagger
//  * /Carts/clear/{id}:
//  *   put:
//  *     summary: Update cart by id
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The cart Id
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Carts'
//  *     responses:
//  *       200:
//  *         description: The Cart updated successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Carts'
//  *       404:
//  *         description: Cart Not Found
//  *       500:
//  *         description: Some error happened
//  */
// router.put("/clear/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const cart = await cartModel.findByIdAndUpdate(id, req.body, { new: true });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart Not Found" });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /**
//  * @swagger
//  * /Carts/{id}:
//  *   delete:
//  *     summary: Delete cart by id
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The cart Id
//  *     responses:
//  *       200:
//  *         description: The Cart is deleted successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Carts'
//  *       404:
//  *         description: Cart Not Found
//  *       500:
//  *         description: Some error happened
//  */
// router.delete("/:id", async (req, res) => {
//   try {
//     const cart = await cartModel.findByIdAndDelete(req.params.id);
//     if (!cart) {
//       return res.status(404).json({ message: "Cart Not Found" });
//     }
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /**
//  * @swagger
//  * /Carts/clear/{email}:
//  *   delete:
//  *     summary: Delete all carts for a specific email
//  *     tags: [Carts]
//  *     parameters:
//  *       - in: path
//  *         name: email
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The email for which to delete all carts
//  *     responses:
//  *       200:
//  *         description: All carts for the specified email are deleted successfully.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Carts'
//  *       404:
//  *         description: Carts Not Found for the specified email
//  *       500:
//  *         description: Some error happened
//  */
// router.delete("/clear/:email", async (req, res) => {
//   const { email } = req.params;
//   try {
//     const deletedCarts = await cartModel.deleteMany({ email });
//     if (deletedCarts.deletedCount === 0) {
//       return res
//         .status(404)
//         .json({ message: "Carts Not Found for the specified email" });
//     }
//     res.status(200).json(deletedCarts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


/**
 * @swagger
 * components:
 *  schemas:
 *    Cart:
 *          type: object
 *          required:
 *            -   product_id
 *            -   email
 *            -   price
 *            -   name
 *            -   image
 *            -   quantity
 *
 *          properties:
 *            product_id:
 *                type: String
 *                description:  The id  of  the product_id
 *            email:
 *                type: string
 *                description:  The email of  the email
 *            price:
 *                type:  number
 *                description:  The price of the price
 *            name:
 *                type: string
 *                description:  The name of  the name
 *            image:
 *                type: string
 *                description:  The image  of  the image
 *            quantity:
 *                type: number
 *                description:  The quantity  of  the quantity
 *          example:
 *                product_id: "65e0bf27e91792bffddc46b6"
 *                email: "Hiroshi@gmail.com"
 *                price:  3000
 *                name:  "Hiroshi Yamasaki"
 *                image:  "http://example.come/macbook.jpg"
 *                quantity: "1"
 * tags:
 *  name:  Cart
 *  description: the cart  managing  API
*/
const express = require("express");
const router = express.Router();
const ProductModel = require("../models/Product.model")
const CartsModel = require("../models/Carts.model")

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Retrieve  a list  of  cart
 *     tags: [Cart]
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *              application/json:
 *                schema:
 *                      type: array
 *                      items:
 *                            $ref: '#/components/schemas/Cart'
 *       500:
 *         description: Some  error happened
 */



router.get("/" , async (req,res) => {
  try {
    const products = await CartsModel.find();
        res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }  
})
/**
 * @swagger
 * /carts/{email}:
 *   get:
 *     summary: Get product by  id
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The cart Id
 *     responses:
 *       200:
 *         description: The Product by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      type: array
 *                      items:
 *                            $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.get("/:email", async (req, res) => {
  try {
    const userEmail = req.params.email;
    const userCarts = await CartsModel.find({ email: userEmail }); // ใช้ find แทน findOne เพื่อให้ได้รายการทั้งหมดที่ตรงกับ email

    if (!userCarts || userCarts.length === 0) {
      return res.status(404).json({ message: "ไม่พบสินค้า" });
    }

    res.status(200).json(userCarts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /carts:
 *   post:
 *     summary: Create  new cart
 *     tags: [Cart]
 *     requestBody:
 *       required:  true
 *       content:
 *         application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: The Product by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.post("/", async (req, res) => {
  // ตรวจสอบว่า req.body มี property product_id หรือไม่
  if (!req.body.product_id) {
    return res.status(400).json({ message: "Missing product_id in req.body" });
  }

  // ดึงข้อมูลผลิตภัณฑ์จากฐานข้อมูล
  try {
    const product = await ProductModel.findById(req.body.product_id);
    const productId = product._id.toString();

    // ตรวจสอบว่ามีผลิตภัณฑ์
    if (req.body.product_id !== productId) {
       return res.status(404).json({ message: "Product not found" });
    }

    const existingCart = await CartsModel.findOne({ product_id: req.body.product_id });
    const existingCartByUser = await CartsModel.findOne({ email: req.body.email });

    if (existingCart) {
      if (existingCartByUser) {
        // ถ้ามีข้อมูลใน Cart อยู่แล้ว และไม่มี Cart ที่อยู่ใน user นี้
        const quantity = Number(req.body.quantity);
        existingCart.quantity += quantity;
        await existingCart.save();
        return res.status(200).json(existingCart);
      }
    }

    // สร้าง CartsModel ด้วย req.body ที่ถูกส่งมา
    const newCart = new CartsModel(req.body);

    // บันทึกลงในฐานข้อมูล
    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /carts/{id}:
 *   put:
 *     summary: Update cart
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The Cart Id
 *     requestBody:
 *       required:  true
 *       content:
 *         application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Cart'
 *     responses:
 *       201:
 *         description: The Cart by  Id.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Cart Not Found  
 *       500:
 *         description: Some  error happened
 */
router.put("/:id" , async (req,res) => {
  const {id} = req.params.id
  const newProduct = req.body
  try {
    const cart = await CartsModel.findByIdAndUpdate(req.params.id , req.body ,{new:true})
    if (!cart) {
      return res.status(404).json({message:"Product Not Found"})
    }
    res.status(200).json(cart)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @swagger
 * /carts/{id}:
 *   delete:
 *     summary: Delete product
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The product Id
 *     responses:
 *       200:
 *         description: The Product is  delete.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.delete("/:id" , async (req,res) => {
  try {
    const products = await CartsModel.findByIdAndDelete(req.params.id)
    if (!products) {
      return res.status(404).json({message:"Product Not Found"})
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})

/**
 * @swagger
 * /carts/clear/{email}:
 *   delete:
 *     summary: Delete product
 *     tags: [Cart]
 *     parameters:
 *          -   in: path
 *              name: email
 *              required: true
 *              schema:
 *                  type: string
 *              description:  The email
 *     responses:
 *       200:
 *         description: The Product is  delete.
 *         content:
 *              application/json:
 *                schema:
 *                      $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Product Not Found  
 *       500:
 *         description: Some  error happened
 */

router.delete("/clear/:email", async (req, res) => {
  try {
    const {email} = req.params
    const result = await CartsModel.deleteMany({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Carts Not Found for the specified email" });
    }

    res.status(200).json({ message: "Carts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router
