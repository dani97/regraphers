import React, {useEffect, useState} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const  TreeCheckBox = (props) => {

    const initialChecked = [],
        initialExpanded = [],
        initialNodes = [];

    let [checked, setChecked] = useState(initialChecked);
    let [expanded, setExpanded] = useState(initialExpanded);
    let [nodes, setNodes] = useState(initialNodes);
    function onCheck(checked) {
        setChecked(checked);
        props.handleQueryChange(checked);
    }

    useEffect(() => {
        console.log("schema", props.schema);
        setNodes(props.schema);
    },[props.schema]);

    function onExpand(expanded) {
        setExpanded( expanded );
    }

        return (
            <CheckboxTree
                checked={checked}
                expanded={expanded}
                nodes={nodes}
                optimisticToggle={false}
                onCheck={onCheck}
                onExpand={onExpand}
            />
        );
}

export default TreeCheckBox;
