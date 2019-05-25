import React, {useEffect, useState} from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const nodes = [
    {
        value: '/app',
        label: 'app',
        children: [
            {
                value: '/app/Http',
                label: 'Http',
                children: [
                    {
                        value: '/app/Http/Controllers',
                        label: 'Controllers',
                        children: [{
                            value: '/app/Http/Controllers/WelcomeController.js',
                            label: 'WelcomeController.js',
                        }],
                    },
                    {
                        value: '/app/Http/routes.js',
                        label: 'routes.js',
                    },
                ],
            },
            {
                value: '/app/Providers',
                label: 'Providers',
                children: [{
                    value: '/app/Http/Providers/EventServiceProvider.js',
                    label: 'EventServiceProvider.js',
                }],
            },
        ],
    },
    {
        value: '/config',
        label: 'config',
        children: [
            {
                value: '/config/app.js',
                label: 'app.js',
            },
            {
                value: '/config/database.js',
                label: 'database.js',
            },
        ],
    },
    {
        value: '/public',
        label: 'public',
        children: [
            {
                value: '/public/assets/',
                label: 'assets',
                children: [{
                    value: '/public/assets/style.css',
                    label: 'style.css',
                }],
            },
            {
                value: '/public/index.html',
                label: 'index.html',
            },
        ],
    },
    {
        value: '/.env',
        label: '.env',
    },
    {
        value: '/.gitignore',
        label: '.gitignore',
    },
    {
        value: '/README.md',
        label: 'README.md',
    },
];

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
