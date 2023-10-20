import database from '../../../core/src/utils/database.js';


const hardware = (app) => {
    
    //GET operatiion to return a piece of hardware by unique ID 
    //This function executes a stored procedure the returns a JSON object containing details about the hardware item 
    //const scheme is the JSON object that is returned containing the details of the hardware item
    app.get('/hardware/:id', async (req, res) => {
        const session = await database.connect();
        await session.sql('SET @id = ?;')
                    .bind(req.params.id)
                    .execute();
        const statement = "CALL Select_Single_Hardware_Items(@id)";
        const result = await session.sql(statement).execute();
        const hardware = await result.fetchOne();
        const scheme = {
            id: hardware[0],
            tag: hardware[1],
            category: hardware[2],
            status:  hardware[3],
            time:  hardware[4],
            renter_id:  hardware[5]
          }

        return scheme;
    });


    //GET operation to return all hardware
    //This function executes a stored procedure the returns a JSON object containing details about all hardware items
    //const data is the array of item details
    //const scheme is the JSON object that is returned containing the length of the array and the array itself
    app.get('/hardware', async (req, res) => {
        const session = await database.connect();
        const statement = "CALL Select_Hardware_Items()";
        const result = await session.sql(statement).execute();
        const hardware = await result.fetchAll();
        const data = hardware.map((item) => {
            return{
              id: item[0],
              tag: item[1],
              category: item[2],
              status:  item[3],
              time:  item[4],
              renter_id:  item[5]
            }
          });

        const scheme = {
            "length": hardware.length,
            "data": data
          }

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

// GET /hardware Data Schema
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

// GET /hardware/:id Data Schema
// JSON
// {
//   "id": (int) - hardware id
//   "tag": (varchar50) - hardware tag
//   "category": (varchar50) - hardware category
//   "status": (varchar50) - rental status, from the rentals_current table. Should be set to "available" if no record
//   "time": (DateTime) - time of rental, from the rentals_current table. Should be set to "NULL" if no record
//   "renter_id": (varchar255) - id of renter, should just be the user's first name for milestone 1, comes from rentals_current table
//   "rental_history": (array) [
//       "renter_id": (varchar255) - id of renter, should just be the user's first name for milestone 1
//       "time": (DateTime)
//       "status": (varchar50)
//   ]
// }