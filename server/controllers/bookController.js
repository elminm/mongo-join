const { Book } = require("../models/bookSchema");
const { v4: uuidv4 } = require("uuid");

const bookController = {
  getAllBook: (req, res) => {
    Book.find()
      .populate({
        path: "writer",
        populate: { path: "country" },
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getBookById: (req, res) => {
    let id = req.params.id;
    Book.findById(id)
      .then((data) => {
        if (data) {
          res.json(data);
        } else
          res.status(404).json({
            msg: "Not Found",
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  addBook: (req, res) => {
    let file = req.files.imagePath;
    let path = uuidv4() + ".jpeg";
    file.mv("imgs/" + path, function (err) {
      if (!err) {
        res.send("Success!!");
      } else {
        res.status(500).json(err);
      }
    });
    let book = new Book({
      name: req.body.name,
      description: req.body.description,
      publishDate: req.body.publishDate,
      imagePath: path,
      writer: req.body.writer,
      updatedAt: new Date(),
    });
    book.save();
  },
  deleteBookById: (req, res) => {
    Book.findByIdAndRemove(req.params.id)
      .then(() => {
        res.json({
          msg: "Deleted Succesfully",
        });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
module.exports = {
  bookController,
};
