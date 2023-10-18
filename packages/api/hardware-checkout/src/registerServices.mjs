import equipment from './services/equipment.mjs';
import hardware from './services/hardware.mjs';

function registerServices(app) {
    // This equipment service is a prototype for the hardware checkout service
    // Should be removed in a PR for the hardware checkout service
    equipment(app);
    hardware(app);
}

export default registerServices;