let express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
const AuthenticationController = require("../controllers/AuthenticationController")
const PlantController = require("../controllers/PlantController")
const SeedController = require("../controllers/SeedController")
const PlantCareController = require("../controllers/PlantCareController")
const OrderController = require("../controllers/OrderController")

let verifyToken = (request, response, next) => {
    // Get the auth header value
    const bearerHeader = request.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // split at the space
      const bearer = bearerHeader.split(" ");
  
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      request.token = bearerToken;
      // Next middleware
  
      //STUB - If token is expired then also no API call will be accessible prompting for new login --> new token generation
      jwt.verify(request.token, "secretkey123", (err) => {
        if (err) {
          response.status(403).send("TOKEN EXPIRED");
          return;
        } else {
          next();
        }
      });
    } else {
      // Forbidden
      response.status(403).send("UNATHORIZED ACCESS");
    }
  };

//NOTE - TEST ROUTE
router.get("/", (req, res) => {
    res.json({
      message: "Test Route (UNPROTECTED)",
      status: true,
    });
  });

//ANCHOR - AUTH ROUTES
router.post("/api/signup", AuthenticationController.Signup)
router.post("/api/login", AuthenticationController.Login)

//ANCHOR - PLANT ROUTES
router.post("/api/plants", PlantController.CreatePlant)
router.get("/api/plants", PlantController.GetPlants)
router.get("/api/plants/:id", PlantController.GetPlantById)
router.get("/api/similar/plants", PlantController.GetSimilarPlants)

//ANCHOR - SEED ROUTES
router.post("/api/seeds", SeedController.CreateSeed)
router.get("/api/seeds", SeedController.GetSeeds)
router.get("/api/seeds/:id", SeedController.GetSeedById)

//ANCHOR - PLANT CARE ROUTES
router.post("/api/tools", PlantCareController.CreateTool)
router.get("/api/tools", PlantCareController.GetTools)
router.get("/api/tools/:id", PlantCareController.GetToolsById)

//ANCHOR - ORDER ROUTES
router.post("/api/orders", OrderController.CreateOrder)
router.get("/api/orders", OrderController.GetOrders)
router.get("/api/orders/:id", OrderController.GetOrderById)
router.get("/api/user/orders/:id", OrderController.GetOrdersByUserId)

module.exports = router;