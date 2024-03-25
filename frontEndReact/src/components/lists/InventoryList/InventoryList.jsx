import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
// import { BsSdCard, BsTrash, BsPencil } from "react-icons/bs";

export default function InventoryList() {
    const {
        itens: products,
        deleteData,
        updateData,
    } = useFetch("http://localhost:8080/estoque");

    const [editingItemId, setEditingItemId] = useState(null);
    const [productsList, setProductList] = useState([]);

    useEffect(() => {
        setProductList(products);
    }, [products]);

    function handleDelete(id) {
        setProductList((prevProducts) =>
            prevProducts.filter((item) => item.id !== id)
        );
        deleteData(id);
    }

    function handleEdit(id) {
        setEditingItemId(id);
    }

    function handleSave(id) {
        const productElement = document.getElementById(`product-${id}`);
        const quantityElement = document.getElementById(`quantity-${id}`);
        const product = productList.find((item) => item.id == id);

        const updateProduct = {
            ...product,
            product: productElement.value,
            quantity: quantityElement.value,
        };

        updateData(id, updateProduct)
            .then(() => {
                setEditingItemId(null);
                setProductList((prevProducts) =>
                    prevProducts.map((item) =>
                        item.id === id ? { ...item, ...updateProduct } : item
                    )
                );
            })
            .catch((error) => {
                console.error("Error updating item", error);
            });
    }

    function firstCapitalLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function productType(string) {
        if (string === "pet food") {
            return "Pet Food";
        } else if (string === "antiparasitic") {
            return "Antiparasitic";
        } else if (string === "antifleas") {
            return "Antifleas";
        }
    }

    return (
        <div className="container">
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Warehouse</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productsList ? (
                        productsList.map((item) => {
                            const { name } = item.warehouse || {};
                            const isEditing = item.id === editingItemId;

                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{name}</td>
                                    <td>
                                        {isEditing ? (
                                            <select
                                                id={`product-${item.id}`}
                                                defaultValue={item.product}
                                                className="form-control"
                                            >
                                                <option value="pet food">Pet Food</option>
                                                <option value="antiparasitic">Antiparasitic</option>
                                                <option value="antifleas">Antifleas</option>
                                            </select>
                                        ) : (
                                            productType(item.product)
                                        )}
                                    </td>
                                    <td>{firstCapitalLetter(item.category)}</td>
                                    <td>
                                        {isEditing ? (
                                            <input
                                                type="number"
                                                id={`quantity-${item.id}`}
                                                defaultValue={item.quantity}
                                                min={0}
                                                className="form-control"
                                            />
                                        ) : (
                                            item.quantity
                                        )}
                                    </td>

                                    <td>
                                        {isEditing ? (
                                            <button
                                                type="button"
                                                className="btn btn-green"
                                                onClick={() => handleSave(item.id)}
                                            >
                                                <BsSdCard className="text-white btn-green" title="Save" />
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="button"
                                                    className="btn btn-success"
                                                    onClick={() => handleEdit(item.id)}
                                                >
                                                    <BsPencil className="text-white bg-success" tittle="Edit" />
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <BsTrash className="text-white bg-danger" title="Remove" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <p>No products registered yet</p>
                    )}
                </tbody>
            </table>
        </div>
    );
}
