import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultNavbar from "./DefaultNavbar";

describe('DefaultNavbar', () => {
    test('renders correctly', () => {
        render(
            <Router>
                <DefaultNavbar />
            </Router>
        );

        expect(screen.getByText('Full Stack Project')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    test('redirects to the correct page when clicking on the link', () => {
        render(
            <Router>
                <Routes>
                    <Route path="/login">Login Page</Route>
                    <Route path="/user-signUp">Sign Up Page</Route>
                </Routes>
                <DefaultNavbar />
            </Router>
        );

        const loginLink = screen.getByText('Login');
        const signUpLink = screen.getByText('Sign Up');

        expect(loginLink).toHaveAttribute('href', '/login');
        expect(signUpLink).toHaveAttribute('href', '/user-signUp');
    });
});