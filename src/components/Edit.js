import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const Edit = ({ modal, toggle, update, data }) => {
    const [inputList, setInputList] = useState([{ taskData: "" }]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(data.title);
        setInputList(data.taskData);
    }, [data]);

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        let dataObj = {};
        dataObj["title"] = title;
        dataObj["taskData"] = [...inputList];
        update(dataObj);
        toggle(false);
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    const handleRemoveClick = (e, idx) => {
        e.preventDefault();
        const list = [...inputList];
        list.splice(idx, 1);
        setInputList(list);
    };

    const handleAddClick = (e) => {
        e.preventDefault();
        setInputList([...inputList, { taskData: "" }]);
    };

    return (
        <Modal isOpen={modal} toggle={toggle} className="modal-style">
            <form onSubmit={handleUpdate}>
                <ModalHeader toggle={toggle}>Update Todo</ModalHeader>
                <ModalBody>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="title"
                            value={title}
                            className="w-full border p-2 rounded"
                            onChange={(e) => handleChange(e)}
                            required
                        />
                    </div>

                    {inputList &&
                        inputList.length > 0 &&
                        inputList.map((temp, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex items-center">
                                    <input
                                        name="taskData"
                                        placeholder="Task"
                                        value={temp.taskData}
                                        className="w-full border p-2 rounded mr-2"
                                        onChange={(e) =>
                                            handleInputChange(e, i)
                                        }
                                        required
                                    />
                                    {inputList.length !== 1 && (
                                        <button
                                            className="bg-red-500 text-white px-2 py-2 flex-shrink-0 rounded"
                                            onClick={(e) =>
                                                handleRemoveClick(e, i)
                                            }
                                        >
                                            Remove
                                        </button>
                                    )}
                                    {inputList.length - 1 === i && (
                                        <button
                                            className="bg-green-500 text-white px-2 py-2 flex-shrink-0 rounded"
                                            onClick={handleAddClick}
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" type="submit">
                        Update
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle} className="">
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};
