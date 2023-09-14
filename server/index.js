const express = require("express")
const app = express()
app.listen(5000, () => {
    console.log("server has started on port 5000")
})

const cors = require("cors")

const pool = require("./db")

//middleware
app.use(cors())
app.use(express.json())

//ROUTES:
app.use("/auth",require("./routes/jwtAuth"))
app.use('/dashboard', require("./routes/dashboard"));

//get all categories:
app.get("/categories", async (req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM categories")
        res.json(allCategories.rows)
        console.log(allCategories.rows)
    } catch (error) {
        console.error(error.message)
    }
})

//get a category:
app.get("/categories/:id", async (req, res) => {
    try {
        const { id } = req.params
        const category = await pool.query("SELECT * FROM categories WHERE category_id=$1", [
            id
        ])
        res.json(category.rows[0])
    } catch (error) {
        console.error(error.message)
    }
})

// products in categories:
app.get("/categories/:category_id/products", async (req, res) => {
    try {
        const { category_id } = req.params;
        const products = await pool.query("SELECT * FROM products WHERE category_id = $1", [
            req.params.category_id
        ]);
        res.json(products.rows);
    } catch (error) {
        console.error(error.message);
    }
});


app.get("/search/:category", async (req, res) => {
    try {
      const { category } = req.params;
  
      const categoryQuery = await pool.query(
        "SELECT category_id FROM categories WHERE category_name = $1",
        [category]
      );
  
      const category_id = categoryQuery.rows[0].category_id;
    
      const productQuery=await pool.query(
        "SELECT * FROM products WHERE category_id=$1",[category_id]
      )
      res.json(productQuery.rows)
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  

app.get("/orders/:order_id/products", async (req, res) => {
    try {
        const { order_id } = req.params;
        const products = await pool.query(
            "SELECT od.product_id, p.product_name, p.unit_price FROM order_details od JOIN products p ON od.product_id = p.product_id WHERE od.order_id = $1",
            [order_id]
        );
        res.json(products.rows);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/customers/:customer_id/orders", async (req, res) => {
    try {
        const { customer_id } = req.params;
        const customerOrders = await pool.query(
            "SELECT o.order_id, p.product_name, p.unit_price FROM orders o JOIN order_details od ON o.order_id = od.order_id JOIN products p ON od.product_id = p.product_id WHERE o.customer_id = $1",
            [customer_id]
        );

        const customerInfo = await pool.query(
            "SELECT * FROM customers WHERE customer_id = $1",
            [customer_id]
        );

        if (customerInfo.rows.length === 0) {
            return res.status(404).json({ error: "Customer not found" });
          }

        res.json({
            customer: customerInfo.rows[0],
            orders: customerOrders.rows
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
});


app.get("/cart",async(req,res)=>{
    try {        
        const cart = await pool.query("SELECT * FROM cart ORDER BY cart_id ASC");
        res.json(cart.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/favs",async(req,res)=>{
    try {
        const favs=await pool.query('SELECT * FROM favorites')
        res.json(favs.rows)
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/suppliers",async(req,res)=>{
    try {
        const suppliers=await pool.query("SELECT * FROM suppliers")
        res.json(suppliers.rows)
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/employees",async(req,res)=>{
    try {
        const employees=await pool.query("SELECT * FROM employees")
        res.json(employees.rows)
        console.log(employees.rows)
    } catch (error) {
        console.error(error.message);
    }
})


app.post("/cart/add", async (req, res) => {
    try {
        const { product_id } = req.body;
        const addToCartQuery = "INSERT INTO cart (product,price) SELECT product_name,unit_price FROM products WHERE product_id = $1";
        await pool.query(addToCartQuery, [product_id]);

        res.status(201).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/favorites/add",async(req,res)=>{
    try {
        const {product_id}=req.body;
        const addTofavQuery="INSERT INTO favorites (product_name,product_price) SELECT product_name,unit_price FROM products WHERE product_id=$1";
        await pool.query(addTofavQuery,[product_id]);
        res.status(201).json({ message: "Product added to favorites successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.delete("/cart/:cart_id",async(req,res)=>{
    try {
        const {cart_id}=req.params
        const deleteProduct=await pool.query("DELETE FROM cart WHERE cart_id=$1",[cart_id])
        res.json("product has been deleted")
    } catch (error) {
        console.log(err.message)
    }
})

app.delete("/favs/:fav_id",async(req,res)=>{
    try {
        const {fav_id}=req.params
        const deleteFav=await pool.query("DELETE FROM favorites WHERE fav_id=$1",[fav_id])
        res.json("favorite has been deleted")
    } catch (error) {
        console.log(error.message)
    }
})

app.post("/orders/create", async (req, res) => {
    try {
        const { customer_id,ship_address,ship_city,ship_region,ship_postal_code,ship_country } = req.body;

        const customerCheckQuery = "SELECT COUNT(*) FROM customers WHERE customer_id = $1";
        const customerCheckResult = await pool.query(customerCheckQuery, [customer_id]);
        const customerExists = parseInt(customerCheckResult.rows[0].count) > 0;

        if (!customerExists) {
            return res.status(400).json({ message: "Invalid customer ID" });
        }
        // Get a random shipper from the shippers table
        const randomShipperQuery = "SELECT shipper_id FROM shippers ORDER BY random() LIMIT 1";
        const shipperResult = await pool.query(randomShipperQuery);
        const ship_via = shipperResult.rows[0].shipper_id;

        // Get a random employee from the employees table
        const randomEmployeeQuery = "SELECT employee_id FROM employees ORDER BY random() LIMIT 1";
        const employeeResult = await pool.query(randomEmployeeQuery);
        const employee_id = employeeResult.rows[0].employee_id;

        //Get id of the last order and assign +1 to new order(order_id must be assigned by the db, so I added 1)
        const maxOrderIdQuery = "SELECT MAX(order_id) as max_order_id FROM orders";
        const maxOrderIdResult = await pool.query(maxOrderIdQuery);
        const nextOrderId = maxOrderIdResult.rows[0].max_order_id + 1;
       
        const createOrderQuery = `
            INSERT INTO orders (order_id, customer_id, employee_id, order_date, ship_via,ship_address,ship_city,ship_region,ship_postal_code,ship_country)
            VALUES ($1, $2, $3, NOW(), $4,$5,$6,$7,$8,$9) RETURNING order_id`;
        const { rows } = await pool.query(createOrderQuery, [nextOrderId, customer_id, employee_id, ship_via,ship_address,ship_city,ship_region,ship_postal_code,ship_country]);
        const order_id = rows[0].order_id;

        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get('/orders',async(req,res)=>{
    try {
        const lastOrder=await pool.query("SELECT * FROM orders ORDER BY order_id DESC LIMIT 1")
        res.json(lastOrder.rows)
    } catch (error) {
        console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
})
//post a user to users:
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({ message: "Invalid user email" });
      }
  
      if (user.rows[0].password !== password) {
        return res.status(400).json({ message: "Invalid password" });
      }
  
      res.json({ message: "Login successful" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  });
  

