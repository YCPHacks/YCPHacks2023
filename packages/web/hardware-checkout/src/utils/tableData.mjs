// import database, { create } from '../services/database.js';
import { utils } from '@ycphacks/core-api';

const { serverConnection } = utils;
// Purpose: to provide mock data for the table component

// These are the column headers for the table
const columns = [" ","Name", "Tag", "Category", "Available", "User", "Date"];

// This is the data for the table
async function getData() {
    // const equipment = await database.find('equipment');
    const equipment = await serverConnection('GET', 'equipment');
    
    if (!equipment) {
        return [];
    }


    // const data = equipment.map((item) => {
    //     return [item.tag, item.category, item.available];
    // });
    // const data = [
    //     {
    //         id: 1,
    //         tag: "PC-1", 
    //         category: "PC", 
    //         available: "Available", 
    //         user: "N/A", 
    //         date: "N/A"},
    //     {
    //         id: 2432,
    //         tag: "VR-2", 
    //         category: "VR Headset", 
    //         available: "Unavailable", 
    //         user: "N/A", 
    //         date: "N/A"},
    //     {
    //         id: 3354,
    //         tag: "USBC-1", 
    //         category: "USB Type-C Cable", 
    //         available: "Rented", 
    //         user: "Koen", 
    //         date: Date.now().toString()
    //     },
    // ]

    return equipment;
};

// These are the options for the table
const sortable = true;
const searchable = true;
const filterable = true;

// This is compiling the data into a single object
async function createTableData() {
    return {
        columns,
        data: await getData(),
        // data: [],
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