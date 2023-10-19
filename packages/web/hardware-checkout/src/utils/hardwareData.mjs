import { utils } from '@ycphacks/core-api';

const { serverConnection } = utils;

async function getData(hardwareId) {
    const equipment = await serverConnection('GET', `equipment/${hardwareId}`);
    if (!equipment) {
        return [];
    }
    return equipment;

    let data = {};

    // const data = {
    //     id: equipment.id,
    //     tag: equipment.tag,
    //     category: equipment.category,
    //     available: equipment.available,
    //     user: equipment.user,
    //     date: equipment.date,
    //     rental_history: equipment.rental_history,
    // };
    if(hardwareId = 1){
        data = {
            tag: "PC-1",
            category: "PC",
            available: "Available", 
            user: "N/A", 
            date: "N/A"
        }
    } else if(hardwareId = 2432){
        data = {
            tag: "VR-2", 
            category: "VR Headset", 
            available: "Unavailable", 
            user: "N/A", 
            date: "N/A"
        }
    } else if(hardwareId = 3354){
        data = {
            tag: "USBC-1", 
            category: "USB Type-C Cable", 
            available: "Rented", 
            user: "Koen", 
            date: Date.now().toString()
        }
    } else {
        data = {
            tag: "N/A",
            category: "N/A",
            available: "N/A",
            user: "N/A",
            date: "N/A"
        }
    }

    return data;
}

// This is compiling the data into a single object
async function getHardwareData(id) {
    const data = await getData(id);
    return {
        tag: data.tag,
        category: data.category,
        available: data.available,
        user: data.user,
        date: data.date,
        rental_history: data.rental_history,

    };
}

// This is exporting the object as a module to be imported elsewhere
export default getHardwareData;