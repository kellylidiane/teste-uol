import React, { useState } from "react";
import ReactModal from "react-modal";

import "./ModalForm.scss";

ReactModal.setAppElement("#root");
const ModalForm = ({ open, setIsOpen, dragon, refetch }) => {
    const [name, setName] = useState(dragon ? dragon.name : "");
    const [type, setType] = useState(dragon ? dragon.type : "");

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "250px",
        },
    };

    const onClose = () => {
        setName("");
        setType("");
        setIsOpen(false);
        refetch();
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (name.trim() && type.trim()) {
            if (dragon) {
                fetch(`https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon/${dragon.id}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        name,
                        type,
                    })
                }).then(response => response.json())
                    .then(() => {
                        alert("Dragão editado com sucesso!");
                        onClose();
                    })
                    .catch(error => console.error(error));
            } else {
                fetch("https://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon", {
                    method: "POST",
                    body: JSON.stringify({
                        createdAt: new Date().toISOString(),
                        name,
                        type,
                        histories: []
                    })
                }).then(response => response.json())
                    .then(() => {
                        alert("Dragão criado com sucesso!");
                        onClose();
                    })
                    .catch(error => console.error(error));
            }
        }
    };

    return (
        <ReactModal
            isOpen={open}
            onRequestClose={onClose}
            style={customStyles}
        >
            <div className="modal-header">Novo dragão<button title="Fechar" onClick={onClose}>&#x2715;</button></div>
            <form className="modal-form" onSubmit={onSubmit}>
                <label htmlFor="name">Nome:</label>
                <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} required />
                <label htmlFor="type">Tipo:</label>
                <input id="type" type="text" value={type} onChange={(event) => setType(event.target.value)} required />
                <input type="submit" value="Salvar" />
            </form>
        </ReactModal>
    );
};

export default ModalForm;