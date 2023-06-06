const { Book } = require("../models/bookSchema");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

const bookController = {
  getAllBook: async (req, res) => {
    try {
      const data = await Book.find().populate({
        path: "writer",
        populate: { path: "country" },
      });
      res.json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getBookById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Book.findById(id);
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({
          msg: "Not Found",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addBook: async (req, res) => {
    try {
      const file = req.files.imagePath;
      const namePic = uuidv4() + ".jpeg";
      const path = __dirname + "/.." + "/imgs/" + namePic;
      await file.mv(path);

      const book = new Book({
        name: req.body.name || "",
        description: req.body.description || "",
        publishDate: req.body.publishDate || "",
        imagePath: process.env.BASE_URI + namePic,
        writer: req.body.writer || "",
        updatedAt: new Date(),
      });

      await book.save();
      res.send("Success!!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteBookById: async (req, res) => {
    try {
      const data = await Book.findByIdAndRemove(req.params.id);
      let idx = data.imagePath.lastIndexOf("/");
      let imgName = data.imagePath.substring(idx);
      const url = __dirname + "/.." + "/imgs" + imgName;
      console.log("DIRECTION", url);
      fs.unlink(url, (err) => {
        if (!err) {
          res.json({
            msg: "Deleted Successfully",
          });
        } else {
          res.status(500).json({ msg: "Not Found" });
        }
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = {
  bookController,
};
