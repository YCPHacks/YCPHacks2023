const mysqlx = require('@mysql/xdevapi');

const {
    connectionConfig
} = require('../../config.js');
// This file is used to make connecting and making database operation easier
// It avoids having to write the same code over and over again

/**
 * connect - Connects to a database
 * 
 * @returns {Promise<Session>}
 */
async function connect () {
    try {
        // Open connection to db
        const session = await mysqlx.getSession(connectionConfig);
        return session;
    } catch (err) {
        const { message, stack } = err;

        console.error(JSON.stringify({ message, stack }));

        process.exitCode = 1;
    }
}

/**
 * close - Closes a session
 * @param {Session} session Session to close
 * 
 * @returns {Promise<void>}
 */
async function close (session) {
    try {
        await session?.close();
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    }
}

async function executeStoredProcedure (procedureName, bindingStatement = '') {
    let result;
    let session;
    try {
        session = await connect();
        result = await session.sql(`CALL ${procedureName}(${bindingStatement})`).execute();
        result = await result.fetchAll();
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}

/**
 * createSchema - Creates a schema
 * @param {string} schemaName Name of the schema
 * 
 * @returns {Promise<void>} 
 */
async function createSchema (schemaName) {
    const session = await connect();
    try {
        await session.createSchema(schemaName);
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
        
    } finally {
        await close(session);
    }
}

/**
 * getSchema - Gets a schema
 * @param {string} schemaName Name of the schema
 * 
 * @returns {Promise<Schema>}
 */
async function getSchema (schemaName = connectionConfig.schema) {
    let schema
    try {
        const session = await connect();
        schema = await session.getSchema(schemaName);
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    }
    return schema;
}

/**
 * createCollection - Creates a collection
 * @param {string} collectionName 
 * @returns {Promise<Collection>}
 */
async function createCollection (collectionName, schemaName = connectionConfig.schema) {
    let collection;
    let session;
    try {
        session = await connect();
        const schema = await session.getSchema(schemaName);
        collection = await schema.createCollection(collectionName);
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return collection;
}

/**
 * getCollection - Gets a collection
 * @param {string} collectionName Name of the collection
 * @param {string} schemaName Name of the schema
 * 
 * @returns {Promise<Collection>}
 */
async function getCollection (collectionName, schemaName = connectionConfig.schema) {
    let collection;
    let session
    try {
        session = await connect();
        await session.getSchema(schemaName).getCollection(collectionName);
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return collection;
}

/**
 * find - Finds documents in a collection
 * @param {string} schemaName Name of the schema
 * @param {string} collectionName Name of the collection
 * @param {object} query Query to execute
 * 
 * @returns {Promise<FindResult>}
 */
async function find (collectionName, query, schemaName = connectionConfig.schema) {
    let result;
    let session;
    try {
        session = await connect();
        const collection = await session.getSchema(schemaName).getCollection(collectionName);
        result = await collection.find(query).execute().then(res => {
            return res.fetchAll();
        });
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}

/**
 * addOrReplaceOne - Adds or replaces a document in a collection
 * @param {string} schemaName Name of the schema
 * @param {string} collectionName Name of the collection
 * @param {string} id ID of the document
 * @param {object} document Document to add or replace
 * 
 * @returns {Promise<InsertResult>}
 */
async function addOrReplaceOne (collectionName, id, document, schemaName = connectionConfig.schema) {
    let result;
    let session;
    try {
        session = await connect();
        const collection = await session.getSchema(schemaName).getCollection(collectionName);
        result = await collection.addOrReplaceOne(id, document);
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}

/**
 * deleteOne - Deletes a document from a collection
 * @param {string} schemaName Name of the schema
 * @param {string} collectionName Name of the collection
 * @param {string} id ID of the document
 * 
 * @returns {Promise<DeleteResult>}
 */
async function deleteOne (collectionName, id, schemaName = connectionConfig.schema) {
    let result;
    let session;
    try {
        session = await connect();
        const collection = await session.getSchema(schemaName).getCollection(collectionName);
        result = await collection.remove(`_id = ${id}`).execute();
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}

/**
 * deleteMany - Deletes many documents from a collection
 * @param {string} schemaName Name of the schema
 * @param {string} collectionName Name of the collection
 * @param {string[]} ids IDs of the documents
 * 
 * @returns {Promise<DeleteResult>}
 */
async function deleteMany (collectionName, ids, schemaName = connectionConfig.schema) {
    let result;
    let session;
    try {
        session = await connect();
        const collection = await session.getSchema(schemaName).getCollection(collectionName);
        ids.forEach(async id => {
            await collection.remove(`_id = ${id}`);
        });
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}

/**
 * create - Adds a document to a collection
 * @param {string} schemaName Name of the schema
 * @param {string} collectionName Name of the collection
 * @param {object} document Document to add
 * 
 * @returns {Promise<InsertResult>}
 */
async function create (collectionName, document, schemaName = connectionConfig.schema) {
    let result;
    let session;
    try {
        session = await connect();
        const collection = await session.getSchema(schemaName).getCollection(collectionName);
        console.log(document);
        result = await collection.add(document).execute();
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}

/**
 * patch - Updates a document in a collection
 * @param {string} schemaName Name of the schema
 * @param {string} collectionName Name of the collection
 * @param {string} id ID of the document
 * @param {object} document Document to update
 * 
 * @returns {Promise<UpdateResult>}
 */
async function patch (collectionName, id, document, schemaName = connectionConfig.schema) {
    let result;
    let session;
    try {
        session = await connect();
        const collection = await session.getSchema(schemaName).getCollection(collectionName);
        result = await collection.modify(`_id = ${id}`).patch(document).execute();
    } catch (err) {
        const { message, stack } = err;
        console.error(JSON.stringify({ message, stack }));
    } finally {
        await close(session);
    }
    return result;
}


module.exports = {
    connect,
    close,
    executeStoredProcedure,
    createSchema,
    getSchema,
    createCollection,
    getCollection,
    find,
    addOrReplaceOne,
    deleteOne,
    deleteMany,
    create,
    patch
}