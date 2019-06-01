import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import CreateProject from "./CreateProject";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Message from "./Message";
import './../styles/basicStyles.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProjectGrid = (props) => {
console.log('props in project grid is ', props);

    let [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    return (
        <div>
            <div className={"title-bar"}>
                <h2>Dashboard</h2>
            </div>
            <div className={"sections-container"}>
                <div className={"section half rb-1"}>
                    <h3 className={"section-title"}>Create a new project</h3>
                    <button onClick={onOpenModal} className={"primary-card"}>+</button>
            <Modal visible={visible} width="400" height="300" effect="fadeInUp" onClickAway={onCloseModal}>
                <CreateProject closeModal={onCloseModal} routerProps={props}/>
            </Modal>
        </div>
        <div className={"section half"}>
                    <h3 className={"section-title"}>Existing Projects</h3>
                    <div className={"secondary-card"}>
                        <div className={"secondary-card-main"}>Project 1</div>
                        <div className={"secondary-card-actions"}>
                            <div className={"action primary"}><FontAwesomeIcon icon={faPencilAlt}/> Edit</div>
                            <div className={"action"}><FontAwesomeIcon icon={faTrash}/> Delete</div>
                        </div>
                    </div>
                    <div className={"secondary-card"}>
                        <div className={"secondary-card-main"}>Project 2</div>
                        <div className={"secondary-card-actions"}>
                            <div className={"action primary"}><FontAwesomeIcon icon={faPencilAlt}/> Edit</div>
                            <div className={"action"}><FontAwesomeIcon icon={faTrash}/> Delete</div>
                        </div>
                    </div>
                    <div className={"secondary-card"}>
                        <div className={"secondary-card-main"}>Project 3</div>
                        <div className={"secondary-card-actions"}>
                            <div className={"action primary"}><FontAwesomeIcon icon={faPencilAlt}/> Edit</div>
                            <div className={"action"}><FontAwesomeIcon icon={faTrash}/> Delete</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectGrid;