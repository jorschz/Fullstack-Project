import { useNavigate } from "react-router-dom";
import { useForm } from "../../../hooks/useForm";
import { useFetch } from "../../../hooks/useFetch";
import DogsLogin from "../../../imagens/dogs-login.png"
import { useAuthentication } from "../../../hooks/useAuthentication";
import { useEffect } from "react";


export default function LoginForm() {
    const navigate = useNavigate();
    const { handleChange, form, resetForm } = useForm({
        password: "",
        email: "",
    });

    // Authentication treatment
    const { isLoggedIn, login } = useAuthentication();

    const { createData } = useFetch("http://localhost:8080/usuario/login");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.email.trim().length === 0) {
            alert("The user's email cannot be empty or blank.")
            return;
        } else if (form.password.trim().length === 0) {
            alert("The user's password cannot be empty or blank.")
            return;
        }

        createData(form)
            .then((response) => {
                if (response.status === 200 || 201) {
                    login();
                    localStorage.setItem("userData", JSON.stringify(response));
                    window.location.href = "/dashboard"; //Redirects to the dashboard page
                } else {
                    alert("Error logging in, please check your credentials.");
                }
            })
            .catch((error) => {
                alert("Error logging in: incorrect email or password.");
                console.log(error);
            });
        resetForm();
    };

    return (
        <>
            <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
                main="true"
            >
                <img
                    src={DogsLogin}
                    alt="Dogs and Cats"
                    style={{ height: "500px" }}
                />

                <form
                    onSubmit={handleSubmit}
                    className="lcol-4 border"
                    id="UserLoginForm"
                >
                    <h1 className="text-center">Login</h1>
                    <label htmlFor="email">E-mail</label>
                    <br />
                    <input
                        className="form-control my-2"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="E-mail"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control my-2"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="button-form btn btn-success w-100 my-2"
                    > Enter </button>
                    <div className="text-center">
                        <span>
                            {" "}
                            Don't have a user? Click{" "}
                            <a href="/user-registration">
                                <strong>Here</strong>
                            </a>{" "}
                            to register
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}

