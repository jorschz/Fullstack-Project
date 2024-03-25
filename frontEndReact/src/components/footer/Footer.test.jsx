import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer", () => {
    test("should render the component correctly", () => {
        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );

        const title = screen.getByText("*");
        expect(title).toBeInTheDocument();
    })
})