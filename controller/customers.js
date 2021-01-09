const { query } = require("express");
const queryString = require("query-string");
const bcrypt = require("bcrypt");
const formidable = require("formidable");
const dateFormat = require("dateformat");
const fs = require("fs");

require("dotenv").config();
const model = require("../model/customers");
const helper = require("../helper/helper");

const getCustomer = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  }
  const customer = await model.getCustomer(req.user.id);

  dateFormat.masks.hammerTime = "yyyy-mm-dd";
  customer[0].date_of_birth = dateFormat(
    customer[0].date_of_birth,
    "hammerTime"
  );

  res.render("user-profile", customer[0]);
};

const editInfo = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  }
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }

    const coverImage = files.image;

    if (coverImage && coverImage.size > 0) {
      const fileName =
        coverImage.path.split("\\").pop() +
        "." +
        coverImage.name.split(".").pop();
      fs.renameSync(
        coverImage.path,
        process.env.product_image_folder + "/users/" + fileName
      );
      fields.image = "/images/users/" + fileName;
    }

    model.edit(fields, req.user.id).then(() => {
      res.redirect("/users/profile-info");
    });
  });
};

module.exports = {
  getCustomer,
  editInfo,
};
