import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Supplier = {
    name: string;
    'unit price': number;
    'unit weight': number;
    'unit quanitiy': number;
};

export default function DisplayTable({ tableProp }: { tableProp: Supplier[] }) {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Sr. No.</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-center">
                            Unit Price
                        </TableHead>
                        <TableHead className="text-center">
                            Unit Weight
                        </TableHead>
                        <TableHead className="text-center">
                            Unit Quantity
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableProp.map((supplier, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {index + 1}
                            </TableCell>
                            <TableCell className="font-medium">
                                {supplier.name}
                            </TableCell>
                            <TableCell>${supplier['unit price']}</TableCell>
                            <TableCell>{supplier['unit weight']}</TableCell>
                            <TableCell>{supplier['unit quanitiy']}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
