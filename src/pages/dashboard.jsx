import { Link } from 'react-router-dom';

function Dashboard({ books, authors }) {
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
        <div>
          <div className="card text-bg-primary p-3" style={{ width: "18rem" }}>
            <div className="card-body">
              <h3 className="card-title">Total Authors</h3>
              <h2 className="card-text">{authors.length}</h2>
            </div>
          </div>
        </div>
        <div>
          <div className="card text-bg-info p-3" style={{ width: "18rem" }}>
            <div className="card-body">
              <h3 className="card-title">Total Books</h3>
              <h2 className="card-text">{books.length}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
