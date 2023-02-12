const OrderModel = require("../models/OrderModel");

const OrderController = {
  CreateOrder: (request, response) => {

    const { userName, userId, cartItems, subTotal } = request.body;

    console.log(request.body);

    if ( !userName || !userId || !cartItems || !subTotal) {
      response.json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const createdAt = new Date()

    const objtoSend = {
      user_name: userName,
      user_id: userId,
      cart_items: cartItems,
      sub_total: subTotal,
      created_at: createdAt,
      delivery_status: false
    };

    OrderModel.findOne({
        user_id: userId,
        cart_items: cartItems,
        sub_total: subTotal }, (error, seed) => {
      if (error) {
        response.json({
          message: "DB ERROR",
          status: false,
        });
      } else {
        if (seed) {
          response.json({
            message: "Order already exists in database",
            status: false,
          });
        } else {
            OrderModel.create(objtoSend, (error, order) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Order successfully added",
                order: order,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  GetOrders: (request,response) => {
    OrderModel.find({}, (error, orders)=> {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "All orders successfully get",
                orders,
                status: true
            })
        }
    })
  },
  GetOrderById: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    OrderModel.findById(id, (error, order)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Order successfully get",
                order,
                status: true
            })
        }
    })
  },
  GetOrdersByUserId: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    OrderModel.find({user_id: id},(error, orders) => {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: `All orders against user ID: ${id} successfully get`,
                orders: orders,
                status: true
            })
        }
    })
  }
};

module.exports = OrderController;
