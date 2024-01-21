import React, { useEffect, useState } from "react";

import WrapperComponent from "../components/Wrapper";
import DragonListItem from "../components/DragonListItem";
import ModalForm from "../components/ModalForm";

import "./Home.scss";

const HomePage = () => {
    const [dragons, setDragons] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const sortByName = (a, b) => {
        if (a > b) {
            return 1;
        }
        if (a < b) {
            return -1;
        }
        return 0;
    };

    const getDragons = () => {
        fetch('https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            }).then(response => {
                setDragons(response.sort((a, b) => sortByName(a.name.toUpperCase(), b.name.toUpperCase())));
                setLoading(false);
            });
    };

    useEffect(() => {
        getDragons();
    }, []);

    return (
        <WrapperComponent>
            <div className="home-title">
                <h2>Dragões</h2>
                <div className="modal-container">
                    <button className="new-dragon-btn" onClick={() => setIsOpen(true)}>
                        &#43; Criar novo dragão</button>
                    <ModalForm open={modalIsOpen} setIsOpen={setIsOpen} refetch={getDragons} />
                </div>
            </div>
            {loading ? <h3>Carregando...</h3> : (
                <ul className="dragons-list">
                    {dragons.map(dragon => (
                        <DragonListItem key={dragon.id} dragon={dragon} refetch={getDragons} />
                    ))}
                </ul>
            )}
        </WrapperComponent>
    );
};

export default HomePage;
