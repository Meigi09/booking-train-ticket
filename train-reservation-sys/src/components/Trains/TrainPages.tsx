import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TrainPages.css';

interface Train {
    train_id: number;
    train_number: number;
    train_name: string;
    source_station: string;
    destination_station: string;
    class_types: string;
    passengers_left?: number;
}

export default function TrainPages() {
    const [trains, setTrains] = useState<Train[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                const response = await axios.get<Train[]>('http://localhost:8080/api/trains');
                setTrains(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch trains. Please try again.');
                setLoading(false);
            }
        };

        fetchTrains();
    }, []);

    const handleBookTrain = (train: Train) => {
        navigate('/booking', { state: { train } });
    };

    if (loading) return <p>Loading trains...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="train-content flex flex-col justify-center items-center gap-6">
            <h2 className="font-bold text-2xl">Where is your Destination?</h2>
            <div className="train-list grid grid-cols-2 gap-6">
                {trains.map((train) => (
                    <div key={train.train_id} className="train-card shadow p-3 flex gap-6">
                        <div className="train-info items-start">
                            <h3 className="font-bold">{train.train_name}</h3>
                            <p>Train Number: {train.train_number}</p>
                            <p>From: {train.source_station}</p>
                            <p>To: {train.destination_station}</p>
                            <p>Class Types: {train.class_types}</p>
                        </div>
                        <button
                            className="bg-green-800 rounded-md items-end font-bold"
                            onClick={() => handleBookTrain(train)}
                        >
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
