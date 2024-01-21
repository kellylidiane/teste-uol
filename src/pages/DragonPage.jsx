import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import WrapperComponent from "../components/Wrapper";

import "./DragonPage.scss";

const DragonPage = () => {
    const [dragon, setDragon] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    useEffect(() => {
        fetch(`https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${id}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            }).then(response => {
                setDragon(response);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [id]);

    return (
        <WrapperComponent>
            {loading ? <h3>Carregando...</h3> : (
                <div>
                    {dragon ? (
                        <div>
                            <h2>{dragon.name}</h2>
                            <p><strong>Criado em:</strong> {new Date(dragon.createdAt).toLocaleString()}</p>
                            <p><strong>Tipo:</strong> {dragon.type}</p>
                        </div>
                    ) : null}
                </div>
            )}
            <Link className="back-btn" to="/">&#x2B05; Voltar</Link>
        </WrapperComponent>
    )
};

export default DragonPage;
