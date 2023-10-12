import database from '../utils/database.js';

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
        const equipment = await database.find('equipment', `_id = ${req.params.id}`);
        return equipment;
    });

    // Find operation
    // This service retrieves all pieces of equipment matching a query
    app.get('/equipment', async (req, res) => {
        const equipment = await database.find('equipment');
        return res
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(equipment));
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