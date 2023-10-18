import database from '../../../core/src/utils/database.js';

//Creates a collection for me to test from
//database.createCollection('hardware');

//Add items to test collection`
// database.create('hardware', {_id: 1, tag: 'RaspPi', category: 'external'});
// database.create('hardware', {_id: 2, tag: 'PC-1', category: 'PCs'});
// database.create('hardware', {_id: 3, tag: 'VR-1', category: 'VR Headset'});
// database.create('hardware', {_id: 4, tag: 'VR-2', category: 'VR Headset'});
// database.create('hardware', {_id: 5, tag: 'Arduino', category: 'external'});

//delete an item from the collection
//database.deleteMany('hardware', ["0000650f24d90000000000000001","0000650f24d90000000000000002", "0000650f24d90000000000000003", "0000650f24d90000000000000004", "0000650f24d90000000000000005","1", "25"]);



const hardware = (app) => {
    
    //GET operatiion to return a piece of hardware by unique ID 
    app.get('/hardware/:id', async (req, res) => {
        const hardware = await database.executeStoredProcedure('Select_Single_Hardware_Items', req.params.id);
        const scheme = {
            "id": hardware[0],
              "tag": hardware[1],
              "category": hardware[2],
              "status": null,
              "time": null,
              "renter_id": null
          }
        console.log(scheme);
        return scheme;
    });

    //GET operation to return all hardware
    app.get('/hardware', async (req, res) => {
        const hardware = await database.executeStoredProcedure('Select_Hardware_Items');
        const scheme = hardware.map((item) => {
            return{
              "id": item[0],
              "tag": item[1],
              "category": item[2],
              "status":  item[3],
              "time":  item[4],
              "renter_id":  item[5]
            }
          });
        return scheme;
    });

    //POST operation to create a new piece of hardware
    app.post('/hardware', async (req, res) => {
        const hardware = await database.create('hardware', req.body);
        console.log(hardware);
        return res
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(hardware));
    });

    //PATCH operation to update a piece of hardware
    app.patch('/hardware/:id', async (req, res) => {
        const hardware = await database.patch('hardware', req.params.id, req.body);
        return res
            .header('Content-Type', 'application/json')
            .send(JSON.stringify(hardware));
    });

}

export default hardware;

// JSON
// {
//   "length": (int) - should be a count of all rows retrieved
//   "data": (array) [
//     {
//       "id": (int) - hardware id
//       "tag": (varchar50) - hardware tag
//       "category": (varchar50) - hardware category
//       "status": (varchar50) - rental status, from the rentals_current table. Should be set to "available" if no record
//       "time": (DateTime) - time of rental, from the rentals_current table. Should be set to "NULL" if no record
//       "renter_id": (varchar255) - id of renter, should just be the user's first name for milestone 1, comes from rentals_current table
//     }
//   ]
// }