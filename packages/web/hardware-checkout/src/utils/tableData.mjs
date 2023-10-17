// import database, { create } from '../services/database.js';
import { utils } from '@ycphacks/core-api';

const { serverConnection } = utils;
// Purpose: to provide mock data for the table component

// These are the column headers for the table
const columns = ["Tag", "Category", "Available"];

// This is the data for the table
// THIS IS NOT HOW WE WANT THIS TO WORK IN THE FUTURE
// This data pulls from the database everytime the pug layout is rendered
// Ideally, the data should be cached in the browser so that it doesn't have to be pulled from the database every time the page is loaded
// And then we clear the cache if the POST operation is used on the /api/equipment endpoint
// I had trouble figuring out how to get data dynamically in pug, so I just did it this way for now
async function getData() {
    // const equipment = await database.find('equipment');
    const equipment = await serverConnection('GET', 'equipment');
    
    if (!equipment) {
        return [];
    }
    const data = equipment.map((item) => {
        return [item.tag, item.category, item.available];
    });
    return data;
};

// These are the options for the table
const sortable = true;
const searchable = true;
const filterable = true;

// This is compiling the data into a single object
async function createTableData() {
    return {
        columns,
        // data: await getData(),
        data: [],
        sortable,
        searchable,
        filterable,
    };
}

// This is exporting the object as a module to be imported elsewhere
export default createTableData;

/* This is how this JSON object will look once exported
{
    columns: [
        "Name",
        "Age",
        "Occupation"
    ],
    data: [
        [
            "John",
            25,
            "Engineer"
        ],
        [
            "Jane",
            30,
            "Doctor"
        ],
        [
            "Doe",
            20,
            "Student"
        ],
        [
            "Smith",
            28,
            "Designer"
        ]
    ],
    sortable: true,
    searchable: true,
    filterable: true
}
*/