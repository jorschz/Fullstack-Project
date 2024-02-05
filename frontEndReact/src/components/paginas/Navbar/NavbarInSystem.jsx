import { useAuthentication } from "../../../hooks/userAuthentication"

export default function NavbarSystem() {

    const {logout} = useAuthentication();

    const handleSubmitLogout = (event) => {
        event.preventDefault();
        logout();
        window.location.href = "/login";
    };

    const userName = JSON.parse(localStorage.getItem("userData")).name

    return(
        <nav className="navbar navbar-expand-lg navbar-light container-fluid bg-light py-4">
            <link to="/dashboard" className="navbar-brand">
                Project
            </link>
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
        </nav>
    )
}