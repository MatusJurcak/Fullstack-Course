"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(patientService_1.default.getPatient(id));
});
router.post('/', (req, res) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(req.body);
        const addedEntry = patientService_1.default.addPatient(newPatient);
        res.json(addedEntry);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const { id } = req.params;
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const addedEntry = patientService_1.default.addEntry(id, newEntry);
        res.send(addedEntry);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = router;
