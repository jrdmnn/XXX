const express = require("express");
const router = express.Router();
const Business = require("../models/Business");

// get all the businesses
router.get("/", (req, res, next) => {
  Business.find()
    .then((businesses) => {
      res.status(200).json(businesses);
    })
    .catch((err) => {
      res.json(err);
    });
});

// get a specfic business
// to check if id is a valid mongo object id: mongoose.Types.ObjectId.isValid(_id)
router.get("/:id", (req, res, next) => {
  Business.findById(req.params.id)
    .then((business) => {
      if (!business) {
        console.log("no business");
        res.status(404).json(business);
      } else {
        res.status(200).json(business);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// create a business
router.post("/", (req, res) => {
  console.log(req.body);
  const {
    title,
    description,
    street,
    houseNumber,
    city,
    country,
    zipCode,
    email,
  } = req.body;
  const owner = req.user._id;

  Business.create({
    title,
    description,
    street,
    houseNumber,
    city,
    zipCode,
    country,
    email,
    owner,
  })
    .then((business) => {
      res.status(201).json(business);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update a business
router.put("/:id", (req, res, next) => {
  const {
    title,
    description,
    street,
    houseNumber,
    city,
    zipCode,
    country,
    email,
  } = req.body;
  Business.findByIdAndUpdate(
    req.params.id,
    { title, description, street, houseNumber, city, zipCode, country, email },
    // this ensures that we are getting the updated document as a return
    { new: true }
  )
    .then((business) => {
      console.log(business);
      res.status(200).json(business);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res, next) => {
  Business.findByIdAndDelete(req.params.id)
    .then((business) => {
      res.status(200).json({ message: "ok" });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
