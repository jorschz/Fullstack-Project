import React, { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { useForm } from "../../../hooks/useForm"
import Cat from "../../../imagens/cat.png"

export default function ProductRegistrationForm() {
    const { handleChange, form, resetForm } = useForm({
        product: "",
        quantity: 0,
        animal: "",
        category: "",
        warehouse: "",
    });

    const { createData } = useFetch("http://localhost:8080/inventory")
    const { itens: warehouse, error } = useFetch("http://localhost:8080/warehouse");
    const { selectedWarehouse, setSelectedWarehouse } = useState(null);
    const { submitError, setSubmitError } = useState("");

    useEffect(() => {
        openWarehouse();
    }, []);

    const openWarehouse = () => {
        if (!error && warehouse) {
            const avaibleWarehouse = warehouse.filter(
                (item) => item.situation === true
            );
            return avaibleWarehouse;
        }
        return [];
    };

    const handleWarehouseChange = (event) => {
        const selectedWarehouse = warehouse.find(
            (item) => item.id == event.target.value
        );
        setSelectedWarehouse(selectedWarehouse);
        handleChange(event);
    };

    const handleAnimalChange = (event) => {
        handleChange(event);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createData(convertToJSON(selectedWarehouse))
            .then((response) => {
                if (response.id !== undefined) {
                    alert("Item successfully registered!")
                    setSubmitError("");
                }
            })
            .catch((error) => {
                console.error("Error while registering the item");
                setSubmitError(
                    ("Error registering the item. Please check the data and try again.")
                );
            });

        resetForm();
    };

    const convertToJSON = (selectedWarehouse) => {
        const { product, quantity, animal, category } = form;
        return {
            product,
            quantity,
            animal,
            category,
            warehouse: { ...selectedWarehouse },
        };
    };

    function firstCapitalLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div style={{ display: "flex" }}>
            <img src={Cat} style={{ height: "500px" }} />
            <div className="form-container col-4 ">
                <h1>Inventory Registration</h1>
                <form onSubmit={handleSubmit}>
                    {submitError && (
                        <div style={{ color: "red", marginBottom: "1rem" }}>
                            {submitError}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="warehouse">Storage:</label>
                        <select
                            name="warehouse"
                            value={form.warehouse}
                            onChange={handleWarehouseChange}
                            className="form-control"
                            required
                        >
                            <option value="" disabled>
                                Select warehouse
                            </option>
                            {openWarehouse().map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>
                                        `{item.name}`
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="" disabled>
                                Select product
                            </option>
                            <option value="pet food">Pet food</option>
                            <option value="antiparasitary">Antiparasitary</option>
                            <option value="antifleas">Antifleas</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            min={1}
                            required
                            value={form.quantity}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="animal"></label>
                        <select
                            name="animal"
                            value={form.animal}
                            onChange={handleAnimalChange}
                            className="form-control"
                            required
                        >
                            <option value="" disabled>
                                Select animal
                            </option>
                            {selectedWarehouse && (
                                <option value={selectedWarehouse.animal}>
                                    {firstCapitalLetter(selectedWarehouse.animal)}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="" disable>
                                Select category
                            </option>
                            <option value="adult">Adult</option>
                            <option value="puppy">puppy</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Register
                    </button>

                    <div className="text-center p-2">
                        <span>
                            Go to{" "}
                            <a href="/products-inventory">
                                <strong>Inventory</strong>
                            </a>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}