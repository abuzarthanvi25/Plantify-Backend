const { request, response } = require('express');
const SeedModel = require("../models/SeedModel");

const SeedController = {
  CreateSeed: (request, response) => {

    const { name, price, image, overview, seedBio, category} = request.body;

    console.log(request.body);

    if ( !name|| !price|| !overview|| !seedBio || !image || !category) {
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
      overview:overview,
      seed_bio: seedBio,
      category: category
    };

    SeedModel.findOne({ name: name, price: price }, (error, seed) => {
      if (error) {
        response.json({
          message: "DB ERROR",
          status: false,
        });
      } else {
        if (seed) {
          response.json({
            message: "Seed already exists in database",
            status: false,
          });
        } else {
            SeedModel.create(objtoSend, (error, seed) => {
            if (error) {
              response.json({
                message: `Internal error ${error}`,
                status: false,
              });
            } else {
              response.json({
                message: "Seed successfully added",
                seed: seed,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  GetSeeds: (request,response) => {
    SeedModel.find({}, (error, seeds)=> {
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Seeds successfully get",
                seeds,
                status: true
            })
        }
    })
  },
  GetSeedById: (request, response) => {

    const {id} = request.params

    if(!id){
        response.json({
            message: "ID IS REQUIRED",
            status: false
        })
        return
    }

    SeedModel.findById(id, (error, seed)=>{
        if(error){
            response.json({
                message: "DB ERROR",
                status: false,
            })
        }else{
            response.json({
                message: "Seed successfully get",
                seed,
                status: true
            })
        }
    })
  },
};

module.exports = SeedController;
