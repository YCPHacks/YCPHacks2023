import database from '@ycphacks/core-api/src/utils/database.js';
import mysql from '@mysql/xdevapi';

const equipment = (app) => {
    // Model
    // const Model = createModel(app);

    // Create the equipment collection if it doesn't exist
    // database.createCollection('equipment');
    // database.create('equipment', { _id: 1, name: 'test' });

    // Service

    // Get operation
    // This service retrieves a single piece of equipment by its ID
    // The id is passed in as a parameter in the URL
    app.get('/equipment/:id', async (req, res) => {
        // const equipment = await database.find('equipment', `_id = ${req.params.id}`);
        const session = await database.connect();

        await session.sql('SET @id = ?;')
            .bind(req.params.id)
            .execute();

        const statement = "CALL Select_Single_Hardware_Items(@id)";
        const result = await session.sql(statement).execute();

        const equipment = await result.fetchOne();

        const object = {
            id: equipment[0],
            tag: equipment[1],
            category: equipment[2],
            available: equipment[3],
            user: equipment[4],
            date: equipment[5],
            rental_history: equipment[6],
        }
        // console.log(object);
        return res
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(object));
    });

    // Find operation
    // This service retrieves all pieces of equipment matching a query
    app.get('/equipment', async (req, res) => {
        // const equipment = await database.find('equipment');
        // const equipment = await database.executeStoredProcedure('Select_Hardware_Items');
        const session = await database.connect();

        const statement = "CALL Select_Hardware_Items()";
        const result = await session.sql(statement).execute();

        const equipment = await result.fetchAll();

        const objects = equipment.map((item) => {
            return {
                id: item[0],
                tag: item[1],
                category: item[2],
                available: item[3],
                user: item[4],
                date: item[5],
            }
        });

        // console.log(objects);
        return res
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(objects));
    });

    // Create operation
    // This service creates a new piece of equipment
    // The data for the new piece of equipment is passed in as the request body
    app.post('/equipment', async (req, res) => {
        const equipment = await database.create('equipment', req.body);
        // console.log(equipment);
        return equipment;
    });

    // Patch operation
    // This service updates a piece of equipment
    // The id of the piece of equipment is passed in as a parameter in the URL
    // The data for the updated piece of equipment is passed in as the request body
    app.patch('/equipment/:id', async (req, res) => {
        const equipment = await database.update('equipment', req.params.id, req.body);
        return equipment;
    });
}

export default equipment;