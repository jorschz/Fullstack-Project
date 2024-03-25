import { render, screen } from "@testing-library/react";
import { BrowserRouter  } from 'react-router-dom';
import DashboardList from "./DashboardList";
import { useFetch } from "../../../hooks/useFetch";
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

vi.mock("../../../hooks/useFetch");
let originalAlert;

beforeEach(() => {
    originalAlert = window.alert;
    window.alert = vi.fn();
});

afterEach(() => {
    window.alert = originalAlert;
});

describe('DashboardList components test', () => {
    test("should render components correctly", () => {
        const mockCreateData = vi.fn();
        useFetch.mockReturnValue({
            itens: []
        });

        render(
            <BrowserRouter>
                <DashboardList />
            </BrowserRouter>
        );
    });
})
