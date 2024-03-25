import { useFetch } from "../../../hooks/useFetch";
// import {BiSolidCat, BiSolidDog} from "react-icons/bi";

export default function DashboardList() {
    const animalCategory = (animal, category) => {
        const { itens: itenDash, error } = useFetch(
            `http://127.0.0.1:8080/estatisticas/${animal}/${category}`
        );
        if (error) {
            return <div>Error loading dashboard data</div>
        } else {
            return (
                <div className="col-12">
                    <h5 className="card-title ml-5">{firstCapitalLetter(category)}</h5>
                    <div className="card border-0">
                        <div className="card-body">
                            <div className="card-text d-flex- flex-row text-center">
                                <div className="card flex-fill border-0 mr-5"
                                    style={{ minWidth: "150px", maxHeight: "150px" }}
                                >
                                    <div className="card-body">
                                        {animal === "dog" ? (
                                            <BiSolidDog size={80} />
                                        ) : (
                                            <BiSolidCat size={80} />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="card flex-fill mr-5"
                                    style={{ minWidth: "150px", maxHeight: "150px" }}
                                >
                                    <div className="card-body dashboard-brightness">
                                        <p className="card-text">Kg of Pet Food</p>
                                        <h5 className="text-text font-weight-bold">
                                            {itensDash.totalPetFood}
                                        </h5>
                                    </div>
                                </div>
                                <div className="card flex-fill mr-5" style={{ minWidth: "150px" }}>
                                    <div className="card-body dashboard-brightness">
                                        <p className="card-text">Antifleas</p>
                                        <h5 className="text-text font-weight-bold">
                                            {itensDash.totalWithAntiFleas}
                                        </h5>
                                    </div>
                                </div>
                                <div className="card flex-fill mr-5" style={{ minWidth: "150px" }}>
                                    <div className="card-body dashboard-brightness">
                                        <p className="card-text">Antiparasitic</p>
                                        <h5 className="text-text font-weight-bold">
                                            {itenDash.totalwithAntiparasitic}
                                        </h5>
                                    </div>
                                </div>
                                <div className="card flex-fill mr-2" style={{ minWidth: "150px" }}>
                                    <div className="card-body dashboard-brightness">
                                        <p className="card-text">{firstCapitalLetter(animal)}</p>
                                        <h5 className="text-text font-weight-bold">
                                            {itensDash.totla}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    function firstCapitalLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="container">
            <div className="row">
                {animalCategory("dog", "puppy")}
                {animalCategory("dog", "adult")}
                {animalCategory("cat", "kitten")}
                {animalCategory("cat", "adult")}
            </div>
        </div>
    );
}