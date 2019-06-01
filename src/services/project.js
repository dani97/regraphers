import  AwsClient from "../AwsClient";
import QueryIntrospectionSchema from '../graphQL/QueryIntrospectionSchema';
import ResponseMutation from '../graphQL/ResponseMutation';
import {buildClientSchema} from "graphql";
import { CreateEndPointOperation } from "../graphQL/EndPointOperation";
import { ListEndPointOperations } from "../graphQL/ListEndPointOperations";
import { AnnotatedQueryMutation } from "../graphQL/AnnotatedQueryMutation";

export const getIntrospectionSchema = (endPoint) => {
    return AwsClient.query({
        query: QueryIntrospectionSchema,
        variables: {
            endPoint: endPoint
        },
        fetchPolicy: "cache-first"
    })
        .then((response) => JSON.parse(response.data.getIntrospectionSchema).data);
}

export const listEndPointOperations = (endPoint) => {
    return AwsClient.query({
        query: ListEndPointOperations,
        variables: {
            "filter" :  {
                "endpoint" : {
                    "eq" : endPoint + '/'
                }
            }
        },
        fetchPolicy: "cache-first"
    })
        .then((response) => response);
}

export const createEndPointOperation = (CreateEndPointInput) => {
    return AwsClient.mutate({
        mutation: CreateEndPointOperation,
        variables: {
            input: CreateEndPointInput
        },
        fetchPolicy: "no-cache"
    })
        .then((response) => response.data['createEndPointOperation']);
}

export const executeGraphqlOperation = (variables) => {
    return AwsClient.mutate({
        mutation: ResponseMutation,
        variables,
        fetchPolicy: "no-cache"
    })
        .then((response) => response)
}

export const saveEndPointOperation = (endPoint) => {
    return AwsClient.query({
        query: QueryIntrospectionSchema,
        variables: {
            endPoint: endPoint
        },
        fetchPolicy: "cache-only"
    })
        .then((response) => JSON.parse(response.data.getIntrospectionSchema).data);
}

export const getGraphQLOperationPayload = (endPoint, query, values) => ({
    endPoint,
    query,
    variables: values
})

export const createAnnotatedQueries = (variables) => {
    return AwsClient.mutate({
        mutation: AnnotatedQueryMutation,
        variables,
        fetchPolicy: "no-cache"
    })
        .then((response) => response)
}

export const createTypesObject = (schema) => {
    if(!schema) return {};
    const fields = schema.__schema.types;
    const typesObject = fields.reduce((obj,item) => {
        obj[item.name] = item;
        return obj;
    }, {});
    return typesObject;
}

export const formatArg = (typesObject, queryType) => {
    try {
        let query = typesObject['Query'].fields.find((type) => {
            return type.name == queryType});
        return (query) ? query.args : null;
    }
    catch (e) {
        return null;
    }
}

export const formatSchemaToTree = (typesObject, queryType) => {
    let queryReturnType = null,
        schemaTree = [];

    if(typesObject === null || typesObject ==  {} ) {
        return [];
    }

    if(typesObject && typesObject.Query) {
        let fields = typesObject.Query.fields;
        fields.forEach((field) => {
            if(field.name == queryType) {
              queryReturnType = field.type.name;
            }
        })
    }
    if(queryReturnType) {
        let fields = typesObject[queryReturnType].fields;
        for (let field of fields) {
            createSchemaTree(typesObject, schemaTree, field, queryType);
        }
    }
    return schemaTree;
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

const checkInfRecursion = (parentname , name) => {
    const listName = parentname.split("-");
    return listName.indexOf(name) != -1;
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
