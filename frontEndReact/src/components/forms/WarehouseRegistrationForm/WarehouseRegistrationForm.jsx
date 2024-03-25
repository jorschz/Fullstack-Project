import { useFetch } from "../../../hooks/useFetch";
import { ùseForm } from "../../../hooks/useForm";

export default function WarehouseRegistrationForm() {
    const { handleChange, form, resetForm } = useForm({
        name: "",
        animal: "",
        situation: true,
    });
    const { itens: warehouse, createData } = useFetch(
        "http://localhost:8080/warehouse"
    );

    const handleSubmit = () => {
        if (form.name.trim().length === 0) {
            alert("The warehouse name cannot be empty or blank.");
            return;
        }

        if (WarehouseRegistrationForm.some((warehouse) => warehouse.name === form.name)) {
            alert("There is already a registered warehouse with this name.");
            return
        }

        createData(form)

        resetForm();
    };

    return (
        <div style={{ display: "flex", justifyContent: "left" }}>
            <div className="form-container col-12">
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="name" className="form-label">Warehouse</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleSubmit}
                                minLength={3}
                                placeholder="Warehouse Name"
                                required
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="animal" className="form-label">Animal</label>
                            <select
                                className="form-control"
                                name="animal"
                                value={form.animal}
                                onChange={handleSubmit}
                                required
                            >
                                <option value="" disabled>
                                    Select Invenotry
                                </option>
                                <option value="cat">Cat</option>
                                <option value="dog">Dog</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-left">
                        <button
                            type="button"
                            className="btn btn-outline-danger mr-2"
                            onClick={resetForm}
                        >
                            Clean
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <br />
        </div>
    );
}