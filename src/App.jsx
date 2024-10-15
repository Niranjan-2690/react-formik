import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Author from "./pages/authors";
import Books from "./pages/books";
import { useEffect, useState } from "react";

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedAuthors = JSON.parse(localStorage.getItem("authors")) || [];
    setAuthors(savedAuthors);
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard books={books} authors={authors} />} />
        <Route path="/author" element={<Author authors={authors} setAuthors={setAuthors} />} />
        <Route path="/books" element={<Books books={books} setBooks={setBooks} />} />
      </Routes>
    </div>
  );
}

export default App;
