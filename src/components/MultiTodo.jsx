import React, { useState } from "react";
import { Edit } from "./Edit";
import { Card, CardTitle, CardSubtitle, CardBody, Button } from "reactstrap";

const MultiTodo = () => {
    const [tasks, setTasks] = useState([{ taskData: "" }]);
    const [allTasksData, setAllTasksData] = useState([]);
    const [projectTitle, setProjectTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedTaskData, setUpdatedTaskData] = useState("");
    const [updatedTaskIndex, setUpdatedTaskIndex] = useState("");

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleProjectTitleChange = (e) => {
        setProjectTitle(e.target.value);
    };

    const saveProjectData = (e) => {
        e.preventDefault();
        let projectData = {};
        projectData["title"] = projectTitle;
        projectData["taskData"] = [...tasks];

        let tempData = [...allTasksData];
        tempData.push(projectData);

        setAllTasksData(tempData);
        setProjectTitle(" ");
        setTasks([{ taskData: "" }]);
    };

    const handleTaskInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tasks];
        list[index][name] = value;
        setTasks(list);
    };

    const deleteProjectData = (index) => {
        const list = [...allTasksData];
        list.splice(index, 1);
        setAllTasksData(list);
    };

    const updateProjectData = (updatedTaskData) => {
        let tempData = [...allTasksData];
        tempData[updatedTaskIndex] = updatedTaskData;
        setAllTasksData(tempData);
    };

    const updateTask = (taskData, index) => {
        setUpdatedTaskIndex(index);
        setUpdatedTaskData(taskData);
        toggleModal();
    };

    const handleRemoveTaskClick = (index) => {
        const list = [...tasks];
        list.splice(index, 1);
        setTasks(list);
    };

    const handleAddTaskClick = () => {
        setTasks([...tasks, { taskData: "" }]);
    };

    return (
        <>
            <div className="mx-4">
                <h1 className="text-4xl font-bold text-center my-4">
                    MULTI TODO LIST
                </h1>
                <div className="mx-auto my-4 sm:w-full md:w-1/2 sm:mx-5 ">
                    <Card className="shadow-md p-4">
                        <form onSubmit={saveProjectData}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="w-full border p-2 rounded"
                                    placeholder="Project Title"
                                    onChange={handleProjectTitleChange}
                                    required
                                />
                            </div>

                            {tasks.map((task, i) => (
                                <div key={i} className="mb-4">
                                    <div className="flex items-center">
                                        <input
                                            name="taskData"
                                            placeholder="Task"
                                            value={task.taskData}
                                            className="w-full border p-2 rounded mr-2"
                                            onChange={(e) =>
                                                handleTaskInputChange(e, i)
                                            }
                                            required
                                        />
                                        {tasks.length !== 1 && (
                                            <button
                                                className="bg-red-500 text-white px-2 py-2 mx-1 rounded flex-shrink-0"
                                                onClick={() =>
                                                    handleRemoveTaskClick(i)
                                                }
                                            >
                                                Remove Task
                                            </button>
                                        )}
                                        {tasks.length - 1 === i && (
                                            <button
                                                className="bg-green-500 text-white px-2 py-2 mx-1 rounded flex-shrink-0"
                                                onClick={handleAddTaskClick}
                                            >
                                                Add Task
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2  my-1 rounded flex-shrink-0"
                                    type="submit"
                                >
                                    Add Todo
                                </button>
                            </div>
                        </form>
                    </Card>
                </div>

                {allTasksData.map((projectData, index) => (
                    <div
                        key={index}
                        className="mx-auto my-3 sm:w-full md:w-1/2 sm:mx-5  "
                    >
                        <Card className="hover:border-black focus:border-black shadow-md">
                            <CardBody>
                                <CardTitle
                                    tag="h3"
                                    className="text-xl font-bold"
                                >
                                    Todo Title: {projectData.title}
                                </CardTitle>
                                {projectData.taskData.map((task, i) => (
                                    <CardSubtitle
                                        key={i}
                                        className="mb-2 text-muted"
                                    >
                                        {task.taskData}
                                    </CardSubtitle>
                                ))}
                                <Button
                                    color="danger"
                                    className="mx-2 my-2 flex-shrink-0"
                                    onClick={() => deleteProjectData(index)}
                                >
                                    Delete Todo
                                </Button>
                                <Button
                                    color="success"
                                    onClick={() =>
                                        updateTask(projectData, index)
                                    }
                                    className="mx-2 my-2 flex-shrink-0"
                                >
                                    Update Todo
                                </Button>
                            </CardBody>
                        </Card>
                    </div>
                ))}

                <Edit
                    modal={isModalOpen}
                    toggle={toggleModal}
                    update={updateProjectData}
                    data={updatedTaskData}
                />
            </div>
        </>
    );
};

export default MultiTodo;
