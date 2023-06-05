import { useEffect, useState } from "react";
import BookPage from "./components/BookPage";
import axios from "axios";

export default function App() {
  const [books, setbooks] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/book/api").then((res) => {
      setbooks(res.data);
    });
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>description</th>
            <th>publishDate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td> {book.name}</td>
              <td> {book.description}</td>
              <td> {book.publishDate}</td>
              <td>
                <img src={book.imagePath} alt="asdasd" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookPage />
    </div>
  );
}
