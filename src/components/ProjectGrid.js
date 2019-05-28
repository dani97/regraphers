import React, { useState } from 'react';
import Modal from 'react-awesome-modal';
import CreateProject from "./CreateProject";
import Message from "./Message";

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
            <button onClick={onOpenModal}>Create a New Project</button>
            <Modal visible={visible} width="400" height="300" effect="fadeInUp" onClickAway={onCloseModal}>
                <Message/>
                <CreateProject closeModal={onCloseModal} routerProps={props}/>
            </Modal>
        </div>
    )
}

export default ProjectGrid;