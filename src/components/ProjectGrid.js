import React from 'react';
import { Link } from "react-router-dom";

const ProjectGrid = () => {
    return (
        <div>
            <Link to={"/create"}>Create a New Project</Link>
        </div>
    )
}

export default ProjectGrid;