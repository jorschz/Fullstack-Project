import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/userAuthentication";

export default function App() {

  const { isLoggedIn } = useAuthentication();
  const [authenticated, setAuthenticated] = useState(isLoggedIn)

  useEffect(() => {
    setAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div>
        {authenticated ? <NavbarSystem /> : <NavbarPadrao />}

        <div className="container">
          <Routes>

          </Routes>
        </div>
      </div>
    </Router>

  )

}