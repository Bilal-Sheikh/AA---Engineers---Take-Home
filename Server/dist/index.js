"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const papaparse_1 = __importDefault(require("papaparse"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
const port = 3000;
app.post("/get-processed-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let potatoData = [];
    let cheapestSuppliers = [];
    let availableSuppliers = [];
    const { poundsAvailable } = req.body;
    if (isNaN(poundsAvailable)) {
        return res.status(400).send("Invalid input");
    }
    const response = yield fetch("http://eportal.aa-engineers.com/assessment/potatoQ12024.csv"
    // "https://docs.google.com/spreadsheets/d/1Htl4mNl03__C6vLUG3fmSkevRQ35Go2XhpYPYtDsDgs/gviz/tq?tqx=out:csv"
    );
    const data = yield response.text();
    papaparse_1.default.parse(data, {
        header: true,
        complete: (results) => {
            potatoData = results.data;
        },
    });
    const filterSuppliers = () => {
        // only show if the supplier has enough potatoes
        return potatoData.filter((supplier) => parseInt(supplier["unit quanitiy"]) >= parseInt(poundsAvailable));
    };
    const findCheapestSuppliers = () => {
        const filteredSuppliers = filterSuppliers();
        availableSuppliers = filteredSuppliers;
        // find price per pound
        filteredSuppliers.sort((a, b) => parseFloat(a["unit price"]) / parseFloat(a["unit weight"]) -
            parseFloat(b["unit price"]) / parseFloat(b["unit weight"]));
        // Return the three cheapest suppliers
        return filteredSuppliers.slice(0, 3);
    };
    cheapestSuppliers = findCheapestSuppliers();
    res.status(200).json({ availableSuppliers, cheapestSuppliers });
}));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
