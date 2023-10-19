import equipment from './services/equipment.mjs';

function registerServices(app) {
    // This equipment service is a prototype for the hardware checkout service
    // Should be removed in a PR for the hardware checkout service
    equipment(app);
}

export default registerServices;