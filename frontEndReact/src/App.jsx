import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import {
  NavbarSystem,
  DefaultNavbar,
  LoginPage,
  Dashboard,
  InventoryPage,
  ProductRegistrationPage,
  WarehousePage
} from "./components/paginas";

export default function App() {
  const { isLoggedIn } = useAuthentication();
  const [authenticated, setAuthenticated] = useState(isLoggedIn)

  useEffect(() => {
    setAuthenticated(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div>
        {authenticated ? <NavbarSystem /> : <DefaultNavbar />}

        <div className="container">
          <Routes>
            <Router path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory-products" element={<InventoryPage />} />
            <Route path="/product-registration" element={<ProductRegistrationPage />} />
            <Route path="warehouse-registration" element={<WarehousePage/>} />
            {/* <Route path="/login" element={<LoginPage/>}/> */}
            {/* <Route patch="/user-registration" element={<UserRegistrationPage/>}/> */}
            {/* <Route path="/*" element={<Error/>}/> */}
          </Routes>
        </div>
      </div>
    </Router>

  )

}