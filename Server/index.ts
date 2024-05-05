import express, { Request, Response } from "express";
import cors from "cors";
import Papa from "papaparse";

type Supplier = {
    name: string;
    "unit price": string;
    "unit weight": string;
    "unit quanitiy": string;
};
interface ResultsType {
    data: Supplier[];
}

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);
const port = 3000;

app.post("/get-processed-data", async (req: Request, res: Response) => {
    let potatoData: Supplier[] = [];
    let cheapestSuppliers: Supplier[] = [];
    let availableSuppliers: Supplier[] = [];

    const { poundsAvailable } = req.body;
    if (isNaN(poundsAvailable)) {
        return res.status(400).send("Invalid input");
    }

    const response = await fetch(
        "http://eportal.aa-engineers.com/assessment/potatoQ12024.csv"
        // "https://docs.google.com/spreadsheets/d/1Htl4mNl03__C6vLUG3fmSkevRQ35Go2XhpYPYtDsDgs/gviz/tq?tqx=out:csv"
    );
    const data = await response.text();

    Papa.parse(data, {
        header: true,
        complete: (results: ResultsType) => {
            potatoData = results.data;
        },
    });

    const filterSuppliers = () => {
        // only show if the supplier has enough potatoes
        return potatoData.filter(
            (supplier: Supplier) =>
                parseInt(supplier["unit quanitiy"]) >= parseInt(poundsAvailable)
        );
    };

    const findCheapestSuppliers = () => {
        const filteredSuppliers = filterSuppliers();
        availableSuppliers = filteredSuppliers;

        // find price per pound
        filteredSuppliers.sort(
            (a, b) =>
                parseFloat(a["unit price"]) / parseFloat(a["unit weight"]) -
                parseFloat(b["unit price"]) / parseFloat(b["unit weight"])
        );

        // Return the three cheapest suppliers
        return filteredSuppliers.slice(0, 3);
    };

    cheapestSuppliers = findCheapestSuppliers();

    res.status(200).json({ availableSuppliers, cheapestSuppliers });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
