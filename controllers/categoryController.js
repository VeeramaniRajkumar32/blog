const mongoose = require("../config/dbConn");
const categorySchema = require("../model/categoryModel");
exports.getCategory = (req, res) => {
  categorySchema.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        res.render("../views/pages/category.ejs", { data: data });
      } else {
        res.render("../views/pages/404.ejs");
      }
    }
  });
};
exports.getCategoryId = (req, res) => {
  // res.render("../views/editCategory.ejs");
  // console.log(req.params.id);
   categorySchema.findById(req.params.id,(err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (data) {
        res.render("../views/pages/editCategory.ejs", { data: data });
      } else {
        res.render("../views/pages/404.ejs");
      }
    }
  });
};
exports.createCategory = (req, res) => {
  const category = new categorySchema({
    name: req.body.name,
  });
  try {
    category.save();
    res.redirect("/category");
  } catch (error) {
    res.send(err);
  }
};
exports.updateCategory = (req, res) => {
  categorySchema.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/category");
      }
    }
  );
};
exports.deleteCategory = (req, res) => {
  console.log();
  categorySchema.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/category");
    }
  })
};
