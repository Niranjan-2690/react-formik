import { Link } from 'react-router-dom';
import '../style.css';
import { Formik } from 'formik';
import { useState, useEffect } from 'react';

function Books() {
    const [title, setTitle] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [updateBook, setUpdateBook] = useState(null);
    
    useEffect(() => {
        // Retrieve authors from localStorage
        const savedAuthors = JSON.parse(localStorage.getItem("authors")) || [];
        setAuthors(savedAuthors);
      }, []);

      function handleEdit(id){
        const bookCopy = title.find((bookid)=>bookid.id === id)
        if(bookCopy){
            setUpdateBook(bookCopy)
        }
      }

      function handleDelete(id) {
        const updatedTitles = title.filter((book) => book.id !== id);
        setTitle(updatedTitles);
    }
    return (
        <div>
            <div className="sidebar">
                <div className='sidebar-heading'>
                    <h3>Formik Library</h3>
                    <hr />
                </div>
                <div className='sidebar-menus'>
                    <Link className="sidebar-links" to={"/"}>Dashboard</Link>
                    <Link className="sidebar-links" to={"/author"}>Author</Link>
                    <Link className="sidebar-links" to={"/books"}>Books</Link>
                </div>
            </div>
            <div className='dashboard'>
                <Formik 
                    enableReinitialize
                    initialValues={updateBook || { title: "", author: "", isbn: "", publication: "" }}
                    validate={values => {
                        const errors = {};
                        if (values.title === "") {
                            errors.title = "Required";
                        }
                        if (values.author === "") {
                            errors.author = "Required";
                        }
                        if (values.isbn === "") {
                            errors.isbn = "Required";
                        }
                        if (values.publication === "") {
                            errors.publication = "Required";
                        } 
                        return errors;
                    }}
                    onSubmit={(values, {resetForm}) => {
                        if(updateBook){
                            // Update the book with the same ID
                            setTitle(title.map((book) => (book.id === updateBook.id ? { ...values, id: updateBook.id } : book)));
                        } else {
                            // Add a new book
                            setTitle([...title, { ...values, id: new Date().getTime() }]);
                        }
                        setUpdateBook(null); // Reset the editing state
                        resetForm(); // Reset the form after submission
                    }}
                    
                >
                    {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
                        <form className="row g-3 mt-3" onSubmit={handleSubmit}>
                            <h1 className="text-center mb-3">Book</h1>
                            <div className="col-md-12">
                                <label htmlFor="title" className="form-label">Book Title</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="title" 
                                    id="title" 
                                    value={values.title} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                <p className="mt-1 text-danger">{errors.title}</p>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="author" className="form-label">Author</label>
                                <select name="author" id="author" className="form-select" value={values.author} onChange={handleChange} onBlur={handleBlur}>
                                <option value="">Select Author...</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={`${author.firstname} ${author.lastname}`}>
                                    {author.firstname} {author.lastname}
                                    </option>
                                ))}
                                </select>
                                <p className="mt-1 text-danger">{errors.author}</p>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="isbn" className="form-label">ISBN Number</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    name="isbn" 
                                    id="isbn" 
                                    value={values.isbn} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                <p className="mt-1 text-danger">{errors.isbn}</p>
                            </div>
                            <div className="col-4">
                                <label htmlFor="publication" className="form-label">Publication Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    name="publication"  
                                    id="publication" 
                                    value={values.publication} 
                                    onChange={handleChange} 
                                    onBlur={handleBlur}
                                />
                                <p className="mt-1 text-danger">{errors.publication}</p>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Add Book</button>
                            </div>
                        </form>
                    )}
                </Formik>
                <hr />
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Book Title</th>
                            <th scope="col">Author Name</th>
                            <th scope="col">ISBN Number</th>
                            <th scope="col">Publication Date</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                            {title.map((book, index) => (
                                <tr key={book.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{book.title}</td> {/* Changed from book.values.title */}
                                    <td>{book.author}</td> {/* Changed from book.values.author */}
                                    <td>{book.isbn}</td> {/* Changed from book.values.isbn */}
                                    <td>{book.publication}</td> {/* Changed from book.values.publication */}
                                    <td>
                                        <button type="button" className="btn btn-warning" onClick={() => handleEdit(book.id)}>
                                            <img className="table-btn" src='./edit.png' alt="Edit" />
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(book.id)}>
                                            <img className="table-btn" src='./delete.png' alt="Delete" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            </div>
        </div>
    );
}

export default Books;
