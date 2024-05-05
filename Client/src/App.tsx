import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import DisplayTable from '@/components/DisplayTable';

type Supplier = {
    name: string;
    'unit price': number;
    'unit weight': number;
    'unit quanitiy': number;
};

function App() {
    const [availableSuppliers, setAvailableSuppliers] = useState<Supplier[]>(
        []
    );
    const [cheapSuppliers, setCheapSuppliers] = useState<Supplier[]>([]);
    const [poundsAvailable, setPoundsAvailable] = useState('');
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const { toast } = useToast();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                // 'http://localhost:3000/get-processed-data',
                'https://aa-engineers-take-home.onrender.com/get-processed-data',
                { poundsAvailable: poundsAvailable },
                { headers: { 'Content-Type': 'application/json' } }
            );

            const data = response.data;
            console.log('data', data);

            setAvailableSuppliers(data.availableSuppliers);
            setCheapSuppliers(data.cheapestSuppliers);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'Please only use numberic values',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        fetchData();
    };

    return (
        <div className="max-w-full px-10 my-10 mx-auto">
            <div className="flex justify-center items-center py-5 gap-5">
                <h1>Counter:</h1>
                <Button
                    onClick={() => {
                        setCount((prevCount) => prevCount + 1);
                    }}
                >
                    {count}
                </Button>
            </div>
            <div className="flex gap-5 justify-center items-center">
                <h1>Pounds of potatoes available to purchase:</h1>
                <Input
                    className="w-64 text-black"
                    type="text"
                    value={poundsAvailable}
                    onChange={(e) => setPoundsAvailable(e.target.value)}
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>

            <div className="text-center">
                <div className="py-10">
                    {loading && (
                        <div className="mx-auto animate-spin h-6 w-6 rounded-full border-b-2 border-current"></div>
                    )}
                </div>

                {availableSuppliers.length > 0 ? (
                    <div>
                        <div className="w-4/6 mx-auto">
                            <h1 className="text-center text-2xl font-bold">
                                Three cheapest suppliers
                            </h1>
                            <DisplayTable tableProp={cheapSuppliers} />
                        </div>

                        <div className="py-10 w-4/6 mx-auto">
                            <h1 className="text-center text-2xl font-bold">
                                A list of available suppliers
                            </h1>
                            <DisplayTable tableProp={availableSuppliers} />
                        </div>
                    </div>
                ) : (
                    <div className="text-red-600 py-10">No Suppliers Found</div>
                )}
            </div>
        </div>
    );
}

export default App;
