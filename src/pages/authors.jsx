import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Author({ authors, setAuthors }) {
  const [editingAuthor, setEditingAuthor] = useState(null);

  // Handle edit author
  function handleEdit(id) {
    const authorToEdit = authors.find((data) => data.id === id);
    if (authorToEdit) {
      setEditingAuthor(authorToEdit);
    }
  }

  // Handle delete author
  function handleDelete(id) {
    const updatedAuthors = authors.filter((data) => data.id !== id);
    setAuthors(updatedAuthors);
    
    // Save updated authors to localStorage
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));
  }

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-heading">
          <h3>Formik Library</h3>
          <hr />
        </div>
        <div className="sidebar-menus">
          <Link className="sidebar-links" to={"/"}>Dashboard</Link>
          <Link className="sidebar-links" to={"/author"}>Author</Link>
          <Link className="sidebar-links" to={"/books"}>Books</Link>
        </div>
      </div>
      <div className="dashboard">
        <Formik
          enableReinitialize
          initialValues={editingAuthor || { firstname: "", lastname: "", dob: "", biograph: "" }}
          
          validate={values => {
            const errors = {};
            if (!values.firstname) {
              errors.firstname = "Required";
            } else if (!values.lastname) {
              errors.lastname = "Required";
            } else if (!values.dob) {
              errors.dob = "Required";
            } else if (!values.biograph) {
              errors.biograph = "Required";
            } else if (values.biograph.length < 25) {
              errors.biograph = "Biography must be at least 25 characters long";
            }
            return errors;
          }}

          onSubmit={(values, { resetForm }) => {
            let updatedAuthors;
            if (editingAuthor) {
              updatedAuthors = authors.map((author) =>
                author.id === editingAuthor.id ? { ...values, id: editingAuthor.id } : author
              );
              setEditingAuthor(null);
            } else {
              updatedAuthors = [...authors, { ...values, id: new Date().getTime() }];
            }
            setAuthors(updatedAuthors);

            // Save authors to localStorage
            localStorage.setItem("authors", JSON.stringify(updatedAuthors));

            resetForm();
          }}
        >
          {({ values, errors, handleChange, handleBlur, handleSubmit }) => (
            <form className="row g-3 mt-3" onSubmit={handleSubmit}>
              <h1 className="text-center mb-3">Author</h1>
              <div className="col-md-4">
                <label htmlFor="firstname" className="form-label">First name</label>
                <input type="text" className="form-control" name="firstname" id="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} />
                <p className="mt-1 text-danger">{errors.firstname}</p>
              </div>
              <div className="col-md-4">
                <label htmlFor="lastname" className="form-label">Last name</label>
                <input type="text" className="form-control" name="lastname" id="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} />
                <p className="mt-1 text-danger">{errors.lastname}</p>
              </div>
              <div className="col-4">
                <label htmlFor="dob" className="form-label">DOB</label>
                <input type="date" className="form-control" name="dob" id="dob" value={values.dob} onChange={handleChange} onBlur={handleBlur} />
                <p className="mt-1 text-danger">{errors.dob}</p>
              </div>
              <div className="col-12">
                <label htmlFor="biograph" className="form-label">Author Biography</label>
                <textarea className="form-control" name="biograph" id="biograph" value={values.biograph} onChange={handleChange} onBlur={handleBlur} />
                <p className="mt-1 text-danger">{errors.biograph}</p>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary">{editingAuthor ? "Update Author" : "Add Author"}</button>
              </div>
            </form>
          )}
        </Formik>

        <hr />

        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Author name</th>
              <th scope="col">DOB</th>
              <th scope="col">Biography</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((data, index) => (
              <tr key={data.id}>
                <th scope="row">{index + 1}</th>
                <td>{data.firstname} {data.lastname}</td>
                <td>{data.dob}</td>
                <td>{data.biograph}</td>
                <td>
                  <button type="button" className="btn btn-warning" onClick={() => handleEdit(data.id)}>
                    <img className="table-btn" src='./edit.png' alt="Edit" />
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(data.id)}>
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

export default Author;
