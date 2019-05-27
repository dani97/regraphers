import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import CreateProject from "./CreateProject";

const ProjectGrid = () => {

    let [visible, setVisible] = useState(false);

    const onOpenModal = () => {
        setVisible(true);
    }

    const onCloseModal= () => {
        setVisible(false);
    }

    return (
        <div>
            <button onClick={onOpenModal}>Create a New Project</button>
            <Modal visible={visible} width="400" height="300" effect="fadeInUp" onClickAway={onCloseModal}>
                <CreateProject closeModal={onCloseModal}/>
            </Modal>
        </div>
    )
}

export default ProjectGrid;