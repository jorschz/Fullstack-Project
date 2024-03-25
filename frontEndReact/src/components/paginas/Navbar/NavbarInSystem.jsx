import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import { useAuthentication } from "../../../hooks/useAuthentication"
// import Footer from "../../footer/Footer"

export default function NavbarSystem() {

    const { logout } = useAuthentication();

    const handleSubmitLogout = (event) => {
        event.preventDefault();
        logout();
        window.location.href = "/login";
    };

    const userName = JSON.parse(localStorage.getItem("userData")).name

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light container-fluid bg-light py-4">
                <Link to="/dashboard" className="navbar-brand">
                    Project
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collpase navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/inventory" className="nav-link">
                                Inventory
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/warehouse-registration" className="nav-link">
                                Warehouse
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link font-weight-bold"
                                href="#"
                            >
                                Oi la, {userName ? userName : ""}!
                            </a>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-danger text-while ml-2 btn-sm"
                                href="#"
                                onClick={handleSubmitLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}