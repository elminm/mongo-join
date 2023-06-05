import { useEffect, useState } from "react";
import BookPage from "./components/BookPage";
import axios from "axios";

export default function App() {
  const [books, setbooks] = useState([]);
  const getData = () => {
    axios.get("http://localhost:8000/book/api").then((res) => {
      setbooks(res.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="app">
      <table style={{ width: "70%" }}>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>publishDate</th>
            <th>picture</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td> {book.name}</td>
              <td> {book.description}</td>
              <td> {book.publishDate}</td>
              <td style={{ width: "100px", height: "100px" }}>
                <img
                  src={book.imagePath}
                  alt="asdasd"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookPage getData={getData} />
    </div>
  );
}
