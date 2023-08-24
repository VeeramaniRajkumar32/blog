const fs = require('fs');
const path = require('path');
const multer = require("multer");

exports.getPost = (req, res) => {
    categorySchema.find((err, category) => {
        if (err) {
            console.log(err);
        } else {
            if (category) {
                postSchema.find((err, post) => {
                    if(post){
                        res.render("../views/pages/post.ejs", { 
                            category: category,
                            post: post
                        });
                    }else{
                        console.log(err);
                    }
                })
            } else {
            res.render("../views/pages/404.ejs");
            }
        }
    });
};

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// let upload = multer({ storage: storage })

exports.createPost = async (req, res) => {
    console.log(req.body.title,
        req.body.category,
        req.body.description);
    const post = new postSchema({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        image: '/uploads/' + req.body.image,
    });
    try {
    await post.save();
      res.redirect("/post")
    } catch (error) {
      res.send(err);
    }
};