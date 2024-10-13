import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Author from "./pages/authors";
import Books from "./pages/books";

function App(){
  return <div>
            <Routes>
              <Route path="/" Component={Dashboard} />
              <Route path="/author" Component={Author} />
              <Route path="/books" Component={Books} />
            </Routes>
         </div>
}

export default App;