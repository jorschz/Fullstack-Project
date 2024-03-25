import { BrowserRouter } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import InventoryList from "./InventoryList";

describe("InventoryList", () => {
    beforeEach(() => {
        visualViewport.resetAllMocks();
    });

    vi.mock("../../../hooks/useFetech");

    test("Should render the component correctly", () => {
        useFetch.mockReturnValue({
            itens: []
        });

        render(
            <BrowserRouter>
                <InventoryList />
            </BrowserRouter>
        );
    });

    test("Render correctly the products", async () => {
        const mockProducts = [
            { id: 1, warehouse: { name: "Warehouse A" }, product: "pet food", category: "Aliment", quantity: 10 },
            { id: 2, warehouse: { name: "Warehouse B" }, product: "Antiparasitary", category: "Medicine", quantity: 5 }
        ];

        useFetch.mockReturnValue({
            itens: mockProducts,
            deleteData: vi.fn(),
            updateData: vi.fn(),
        });

        render(
            <BrowserRouter>
                <InventoryList />
            </BrowserRouter>
        );

        const productRows = await screen.findAllRole("row");

        expect(productRows).toHaveLength(mockProducts.length + 1);
    });

    test("Delete a product properly", () => {
        const mockDeleteData = vi.fn();
        useFetch.mockReturnValue({
            itens: [
                { id: 1, warehouse: { name: "Warehouse A" }, product: "pet food", category: "Aliment", quantity: 10 },
                { id: 2, warehouse: { name: "Warehouse B" }, product: "Antiparasitaryd", category: "Medicine", quantity: 5 }
            ],
            deleteData: mockDeleteData,
            updateData: vi.fn(),
        });

        render(
            <BrowserRouter>
                <InventoryList />
            </BrowserRouter>
        );

        const deleteButton = screen.getAllByText("Delete")[0];
        fireEvent.click(deleteButton);

        expect(mockDeleteData).toHaveBeenCalledWith(1);
    });
});