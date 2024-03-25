import { InventoryList } from "../../lists";

export default function InventoryPage() {
    return (
        <div className="container my-5">
            <div className="row p-2 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                <header className="container">
                    <h1>Inventory List</h1>
                </header>

                <inventoryList />

                <div className="container text-center p-2">
                    <a className="btn btn-success" href="/product-registration">
                        Product Registration
                    </a>
                </div>
            </div>
            <br />
        </div>
    );
}