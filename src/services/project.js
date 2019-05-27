import { AwsClient } from "../AwsClient";
import QueryIntrospectionSchema from '../graphQL/QueryIntrospectionSchema';
import {buildClientSchema} from "graphql";

export const getIntrospectionSchema = (endPoint) => {
    return AwsClient.query({
        query: QueryIntrospectionSchema,
        variables: {
            endPoint: endPoint
        },
        fetchPolicy: "cache-only"
    })
        .then((response) => JSON.parse(response.data.getIntrospectionSchema).data);
}

export const getTreeData = (schema) => {
    return (schema)
        ? formatSchemaToTree(createTypesObject(schema))
        : [];
}

export const buildQuery = (queryLine , queryJson) => {
    let path = queryLine.split("-");
    let queryJsonTraverser = queryJson;
    path.forEach((pathItem, index, pathRef) => {
        if(!queryJsonTraverser.hasOwnProperty(pathItem)) {
            if(pathRef.length - 1 != index) {
                queryJsonTraverser[pathItem] = {};
            }
            else {
                queryJsonTraverser[pathItem] = true;
            }

        }
        queryJsonTraverser = queryJsonTraverser[pathItem];
    });
}

const formatSchemaToTree = (schemaType) => {
    if(schemaType === null || schemaType ==  {} ) {
        return [];
    }
    console.log("schema type", schemaType);
    let fields = schemaType['Products'].fields;
    const schemaTree = [];
    for (const field of fields) {
        createSchemaTree(schemaType, schemaTree, field, 'products');
    }

    return schemaTree;
}

const createSchemaTree = (schema, schemaTree, field, parentName = '') => {
    const hasRecursion = checkInfRecursion(parentName, field.name);
    let node = {
        value: parentName + '-' + field.name,
        label: hasRecursion? '...' + field.name: field.name,
        parentNode: schemaTree
    };
    let name = parentName + '-' + field.name;
    schemaTree.push(node);
    if(hasRecursion) {
        return;
    }
    if(field.type && field.type.kind == "OBJECT" && field.type.name !== null) {
        schemaTree[schemaTree.length-1].children = [];
        const fields = schema[field.type.name].fields;
        for(const innerField of fields) {
            createSchemaTree(schema, schemaTree[schemaTree.length - 1].children, innerField, name);
        }
    }
    else if(field.type && field.type.kind == "LIST") {
        try {
            const interfaceNode = field.type.ofType;
            const fields = schema[interfaceNode.name].fields;
            schemaTree[schemaTree.length-1].children = [];
            if(fields) {
                for (const innerField of fields) {
                    createSchemaTree(schema, schemaTree[schemaTree.length - 1].children, innerField, name);
                }
            }
        }
        catch (e) {
            console.log("error on list processing",e)
        }
    }
    return;
}

const checkInfRecursion = (parentname , name) => {
    const listName = parentname.split("-");
    return listName.indexOf(name) != -1;
}

const createTypesObject = (schema) => {
    if(!schema) return {};
    const fields = schema.__schema.types;
    const typesObject = fields.reduce((obj,item) => {
        obj[item.name] = item;
        return obj;
    }, {});
    return typesObject;
}