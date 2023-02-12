const PlantModel = require("../models/PlantModel");

const PlantController = {
  CreatePlant: (request, response) => {
    const { name, price, size, overview, plantBio, category,image } = request.body;

    console.log(request.body);

    if ( !name|| !price|| !size|| !overview|| !plantBio|| !category || !image) {
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
      size:size,
      overview:overview,
      plant_bio: plantBio,
      category:category
    };

    PlantModel.findOne({ name: name, price: price }, (error, plant) => {
      if (error) {
        response.json({
          message: "DB ERROR",
          status: false,
        });
      } else {
        if (plant) {
          response.json({
            message: "Plant already exists in database",
            status: false,
          });
        } else {
            PlantModel.create(objtoSend, (error, plant) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Plant successfully added",
                plant: plant,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  GetPlants: (request,response) => {
    PlantModel.find({}, (error, plants)=> {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Plants successfully get",
                plants,
                status: true
            })
        }
    })
  },
  GetPlantById: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    PlantModel.findById(id, (error, plant)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Plant successfully get",
                plant,
                status: true
            })
        }
    })
  },
  GetSimilarPlants: (request, response) => {

    const {category} = request.query

    //TODO - QUERY PARAMS SPACE HANDLING USING encodeURI OR CUSTOM ON CLIENT SIDE

    if(!category){
        response.json({
            message: "REQUIRED QUERY PARAMTER IS MISSING",
            status: false
        })
        return
    }

    PlantModel.find({category: category},(error, plants)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }
        else if(plants.length < 1){
          response.json({
            message: "No similar plants exists",
            status: false
          })
        }
        else{
            response.json({
              message: "Similar plants sucessfully get",
              plants,
              status: true
          })
        }
    })
  }
};

module.exports = PlantController;
