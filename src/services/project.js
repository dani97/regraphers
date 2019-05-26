import { AwsClient } from "../AwsClient";
import QueryIntrospectionSchema from '../graphQL/QueryIntrospectionSchema';
import {buildClientSchema} from "graphql";

export const getIntrospectionSchema = () => {
    return AwsClient.query({
        query: QueryIntrospectionSchema,
        fetchPolicy: "cache-only"
    })
        .then((response) => JSON.parse(response.data.getIntrospectionSchema).data);
}

export const getTreeData = (schema) => {
    return (schema)
        ? formatSchemaToTree(createTypesObject(schema))
        : [];
}

const formatSchemaToTree = (schemaType) => {
    if(schemaType === null || schemaType ==  {} ) {
        return [];
    }
    console.log("schema type", schemaType);
    let fields = schemaType['ProductInterface'].fields,
        schemaTree = [];
    for (let field of fields) {
        createSchemaTree(schemaType, schemaTree, field, 'products');
    }

    return schemaTree;
}

const createSchemaTree = (schema, schemaTree, field, parentName = '') => {
    let node = {
        value: parentName + '_' + field.name,
        label: field.name
    };
    let name = parentName + '-' + field.name;
    schemaTree.push(node);
    console.log("field is",field);
    if(field.type && field.type.kind == "OBJECT" && field.type.name !== null) {
        schemaTree[schemaTree.length-1].children = [];
        let fields = schema[field.type.name].fields;
        for(let innerField of fields)
            createSchemaTree(schema,schemaTree[schemaTree.length-1].children , innerfield, name);
    }
    return;
}

const createTypesObject = (schema) => {
    if(!schema) return {};
    let fields = schema.__schema.types;
    let typesObject = fields.reduce((obj,item) => {
        obj[item.name] = item;
        return obj;
    }, {});
    return typesObject;
}