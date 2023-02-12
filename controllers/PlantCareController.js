const { request, response } = require('express');
const PlantCareModel = require("../models/PlantCareModel");

const PlantCareController = {
  CreateTool: (request, response) => {

    const { name, price, image,description, dimensions, weight, madeIn, category} = request.body;

    console.log(request.body);

    if ( !name|| !price|| !description|| !dimensions|| !weight|| !madeIn || !image || category) {
      response.json({
        message: "Required fields are missing",
        status: false,
      });
      return;
    }

    const objtoSend = {
      name: name,
      price: price,
      image:image,
      description:description,
      dimensions: dimensions,
      weight: weight,
      made_in: madeIn,
      category: category
    };

    PlantCareModel.findOne({ name: name, price: price }, (error, tool) => {
      if (error) {
        response.json({
          message: "DB ERROR",
          status: false,
        });
      } else {
        if (tool) {
          response.json({
            message: "Plant care tool already exists in database",
            status: false,
          });
        } else {
            PlantCareModel.create(objtoSend, (error, tool) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Plant care tool successfully added",
                tool: tool,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  GetTools: (request,response) => {
    PlantCareModel.find({}, (error, tools)=> {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Plant care tools successfully get",
                tools,
                status: true
            })
        }
    })
  },
  GetToolsById: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    PlantCareModel.findById(id, (error, tool)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Tool successfully get",
                tool,
                status: true
            })
        }
    })
  },
};

module.exports = PlantCareController;
