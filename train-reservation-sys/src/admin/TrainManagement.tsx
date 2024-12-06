import  { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../back';

interface Train {
    train_id: number;
    train_number: number;
    train_name: string;
    source_station: string;
    destination_station: string;
    class_types: string;
    passengers_left?: number;
}

export default function TrainManagement() {
    const [trains, setTrains] = useState<Train[]>([]);
    const [formData, setFormData] = useState({
        train_id:'',
        train_number: '',
        train_name: '',
        source_station: '',
        destination_station: '',
        class_types: ''
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = () => {
        axios.get('http://localhost:8080/api/trains')
            .then(response => setTrains(response.data))
            .catch(error => setError('Failed to fetch trains'));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const { train_number, train_name, source_station, destination_station } = formData;
        if (!train_number || !train_name || !source_station || !destination_station) {
            setError('Please fill in all required fields');
            return false;
        }
        return true;
    };

    const handleAddTrain = () => {
        if (validateForm()) {
            axios.post('http://localhost:8080/api/trains', formData)
                .then(response => {
                    setTrains(prev => [...prev, response.data]);
                    // Reset form after successful submission
                    setFormData({
                        train_id:'',
                        train_number: '',
                        train_name: '',
                        source_station: '',
                        destination_station: '',
                        class_types: ''
                    });
                    setError(null);
                })
                .catch(_error => setError('Failed to add train'));
        }
    };

    const handleDeleteTrain = (id) => {
        axios.delete(`http://localhost:8080/api/trains/${id}`)
            .then(() => {
                setTrains(prev => prev.filter(train => train.train_id !== id));
                setError(null);
            })
            .catch(error => setError('Failed to delete train'));
    };

    return (
        <div>
            <BackButton/>
        <div className='flex justify-between items-center gap-6'>
            

            <div className='flex flex-col items-center p-6'>
            <h2 className='font-bold'>Train Management</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddTrain();
                }} className='flex flex-col items-center gap-6'>
                    <input
                        name="train_id"
                        placeholder="Train Id"
                        value={formData.train_id}
                        onChange={handleInputChange}
                        type="number"
                        required
                        className='p-3 rounded-xl'
                    />
                    <input
                        name="train_number"
                        placeholder="Train Number"
                        value={formData.train_number}
                        onChange={handleInputChange}
                        type="number"
                        required
                        className='p-3 rounded-xl'
                    />
                    <input
                        name="train_name"
                        placeholder="Train Name"
                        value={formData.train_name}
                        onChange={handleInputChange}
                        required
                        className='p-3 rounded-xl'
                    />
                    <input
                        name="source_station"
                        placeholder="Source Station"
                        value={formData.source_station}
                        onChange={handleInputChange}
                        required
                        className='p-3 rounded-xl'
                    />
                    <input
                        name="destination_station"
                        placeholder="Destination Station"
                        value={formData.destination_station}
                        onChange={handleInputChange}
                        required
                        className='p-3 rounded-xl'
                    />
                    <input
                        name="class_types"
                        placeholder="Class Types"
                        value={formData.class_types}
                        onChange={handleInputChange}
                        className='p-3 rounded-xl'
                    />
                    <button type="submit" className='p-3 rounded-xl bg-green-800 hover:bg-white font-bold text-lg'>Add
                        Train
                    </button>
                </form>
            </div>
            <div>
                <ul>
                    <h2 className="font-bold">Trains</h2>
                    {trains.length === 0 && <div>No trains found</div>}
                    <hr className="w-full border-b-2 border-gray-400"/>
                    {trains.map(train => (
                        <div key={train.train_id} className="train-card">
                        <div className="train-info">
                            <h3>{train.train_name}</h3>
                            <p>Train Number: {train.train_number}</p>
                            <p>From: {train.source_station}</p>
                            <p>To: {train.destination_station}</p>
                            <p>Class Types: {train.class_types}</p>
                        </div>
                        <button
                            className="book-btn"
                            onClick={() => handleDeleteTrain(train)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
                
            </ul>
            </div>
        </div>
        </div>
    );
}