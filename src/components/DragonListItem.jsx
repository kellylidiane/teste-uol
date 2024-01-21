import React, { useState } from "react";
import { Link } from "react-router-dom";

import ModalForm from "./ModalForm";

import "./DragonListItem.scss";

const DragonListItem = ({ dragon, refetch }) => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const onDelete = (dragonId, dragonName) => {
        if (window.confirm(`Tem certeza que deseja excluir ${dragonName}?`) === true) {
            fetch(`https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragonId}`, {
                method: "DELETE",
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            }).then(response => {
                refetch();
                alert(`${response.name} excluído com sucesso!`);
            })
                .catch((err) => console.log(err));
        }
    };

    return (
        <li className="dragon-list-item">
            <div className="dragon-content">
                <Link to={`dragon/${dragon.id}`}>
                    <span className="dragon-icon">{dragon.name[0] || "?"}</span><span>{dragon.name || ""}</span>
                </Link>
                <div>
                    <button title="Editar" onClick={() => setIsOpen(true)}>&#128221;</button>
                    <button title="Excluir" onClick={() => onDelete(dragon.id, dragon.name)}>&#128465;</button>
                </div>
            </div>
            <ModalForm open={modalIsOpen} setIsOpen={setIsOpen} dragon={dragon} refetch={refetch} />
        </li>
    );
};

export default DragonListItem;
