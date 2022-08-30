import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import React from 'react'
import { useState } from "react";
import * as DynamoDB from  'react-dynamodb-helper';

async function getDiscussion(table, region, secret, key, topicId, timestamp) {

    var params = {
    TableName: table,
    KeyConditionExpression: "topicId = :a and #timestamp1 >= :t",
    ExpressionAttributeNames: {
        "#timestamp1": "timestamp"
    },
    ExpressionAttributeValues: {
        ":a": topicId,
        ":t": timestamp
    }
    };

    console.log(params);
    let result = await DynamoDB.queryData(region, secret, key, params)
    return result;

}

async function createDiscussion(table, region, secret, key, data) {

    var params = {
    TableName: table,
    Item: data
    };

    let result = await DynamoDB.putData(region, secret, key, params)
    return result;

}

async function updateDiscussion(table, region, secret, key, data) {

    var params = {
        TableName: table,
        Item: data
        };
    console.log(params);
    let result = await DynamoDB.putData(region, secret, key, params)
    console.log(result);
    return result;


}


const exportFunctions = {
    getDiscussion,
    createDiscussion,
    updateDiscussion
};

export default exportFunctions;

