const { default: mongoose } = require("mongoose");

function baseUrl(v) {
  return "http://localhost:8000/" + v;
}
const BookSchema = mongoose.Schema({
  name: String,
  description: String,
  publishDate: String,
  imagePath: { type: String, get: baseUrl },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Writer",
  },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model("Book", BookSchema);
module.exports = {
  Book,
};
