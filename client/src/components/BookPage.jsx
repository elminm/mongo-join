import { useEffect, useState } from "react";
import axios from "axios";

export default function BookPage() {
  const [countries, setCountries] = useState([]);
  const [writers, setWriters] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    imagePath: "",
    publishDate: "",
    country: "",
    writer: "",
  });

  const getAll = () => {
    axios.get("http://localhost:8000/country/api").then(({ data }) => {
      setCountries(data);
    });
    axios.get("http://localhost:8000/writer/api").then(({ data }) => {
      setWriters(data);
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  const handleBookChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("publishDate", data.publishDate);
    formData.append("country", data.country);
    formData.append("writer", data.writer);
    formData.append("imagePath", e.target.elements.imagePath.files[0]);

    axios.post("http://localhost:8000/book/api", formData).then(() => {
      getAll();
    });
  };

  return (
    <>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="book">Book Name</label>
          <input type="text" name="name" onChange={handleBookChange} />
        </div>
        <div>
          <label htmlFor="description">Book Description</label>
          <input type="text" name="description" onChange={handleBookChange} />
        </div>
        <div>
          <label htmlFor="publishDate">Publish Date</label>
          <input type="date" name="publishDate" onChange={handleBookChange} />
        </div>
        <div>
          <label htmlFor="image">Image of Book</label>
          <input type="file" name="imagePath" onChange={handleBookChange} />
        </div>
        <div>
          <label htmlFor="writer">Author</label>
          <select name="writer" onChange={handleSelectChange}>
            {writers.map((writer) => (
              <option value={writer._id} key={writer._id}>
                {writer.firstName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="writer">Country</label>
          <select name="country" onChange={handleSelectChange}>
            {countries.map((country) => (
              <option value={country._id} key={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">save</button>
      </form>
      <style>
        {`
          .book-form {
            display: grid;
            gap: 10px;
            max-width: 400px;
            margin: 0 auto;
          }

          .book-form div {
            display: grid;
            gap: 5px;
          }

          .book-form label {
            font-weight: bold;
          }

          .book-form input,
          .book-form select {
            padding: 5px;
          }

          .book-form input[type="date"] {
            width: 100%;
          }
        `}
      </style>
    </>
  );
}
