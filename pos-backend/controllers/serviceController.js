const { mongoose } = require('mongoose');
const Service = require('../models/serviceModel');

const cloudinary = require('cloudinary').v2;


const addService = async (req, res, next) => {
  
  try {
    const { category, serviceName, price, unit } = req.body;
    const imageFile = req.file

    if (!category || !serviceName || !price || !unit) {
      return res.json({ success: false, message: 'Missing Details' })
    };


    // upload image to cloudinary 
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
    const imageUrl = imageUpload.secure_url

    const service = {
      category,
      serviceName,
      price,
      unit,

      image: imageUrl
    };

    const newService = new Service(service)
    await newService.save()

    res.json({ success: true, message: 'New Service Added' })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
};

// Update Service Controller
const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, serviceName, price, unit } = req.body;
    let imageUrl;

    if (!category || !serviceName || !price || !unit) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // If a new image was uploaded
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, { resource_type: "image" });
      imageUrl = imageUpload.secure_url;
    }

    const updateData = {
      category,
      serviceName,
      price,
      unit
    };

    // Only add image to update if a new one was uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedService) {
      return res.json({ success: false, message: 'Service not found' });
    }

    res.json({ success: true, message: 'Item updated', service: updatedService });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



const getServices = async(req, res, next) => {
    try {
    
        const { sort = '-createdAt' } = req.body;
        const services = await Service.find()

        .sort(sort);
        res.status(200).json({ success: true, message: 'All services fetch successfully', services, data: services})
    
    } catch (error) {
        next(error);
    }
};


const removeService = async(req, res, next) => {
    try {

        await Service.findByIdAndDelete(req.body.id)
        res.json({ success: true, message : 'Selected item removed Successfully' })
    
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message });
    }

}



//exports.updateQuantities = async (req, res) => {
const updateBuyQuantities = async(req, res) => {  
    try {
    const { items } = req.body;
    for (const { id, quantity } of items) {
      await Service.findByIdAndUpdate(id, { $inc: { qty: +quantity } }); // subtract purchased qty
    }
    res.status(200).json({ success: true, message: 'Quantities updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSaleQuantities = async(req, res) => {  
    try {
    const { items } = req.body;
    for (const { id, quantity } of items) {
      await Service.findByIdAndUpdate(id, { $inc: { qty: -quantity } }); // subtract purchased qty
    }
    res.status(200).json({ success: true, message: 'Quantities updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { addService, updateService, getServices, removeService, updateBuyQuantities, updateSaleQuantities }