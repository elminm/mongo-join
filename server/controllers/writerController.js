const { Writer } = require("../models/writerSchema");

const writerController = {
  getAll: (req, res) => {
    Writer.find()
      .populate("country")
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    let id = req.params.id;
    Writer.findById(id)
      .then((data) => {
        if (data) res.json(data);
        else
          res.status(404).json({
            msg: "Not Found",
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  add: (req, res) => {
    let writer = new Writer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      country: req.body.country,
      updatedAt: new Date(),
    });
    writer.save();
    res.json(writer);
  },
  deleteById: (req, res) => {
    Writer.findByIdAndRemove(req.params.id)
      .then((data) => {
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
  writerController,
};
