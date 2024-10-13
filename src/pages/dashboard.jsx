import { Link } from 'react-router-dom';



function Dashboard(){
    return  <div>
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
                    <div>
                        <div className="card text-bg-primary p-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Total Authors</h5>
                                <p className="card-text">0</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="card text-bg-info p-3" style={{width: "18rem"}}>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
}

export default Dashboard;