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
    const [searchQuery, setSearchQuery] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchTrains();
    }, []);

    const fetchTrains = () => {
        axios.get('http://localhost:8080/api/trains')
            .then(response => setTrains(response.data))
            .catch(error => setError('Failed to fetch trains'));
    };

    const handleBookTrain = (train: Train) => {
        navigate('/booking', { state: { train, searchQuery } });
    };
    const filteredTrains = trains.filter((train) =>
        train.train_name.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        <div className="train-content flex flex-col justify-center items-center gap-6 scroll-smooth">
            <input
                type="text"
                placeholder="Search by train name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}

            />
            <h2 className="font-bold text-2xl">Where is your Destination?</h2>
            <div className="train-list grid grid-cols-2 gap-6">
                {filteredTrains.map((train) => (
                    <div key={train.train_id} className="train-card shadow p-3 flex gap-6">
                        <div className="train-info items-start">
                            <h3 className="font-bold">{train.train_name}</h3>
                            <p>Train Number: {train.train_number}</p>
                            <p>From: {train.source_station}</p>
                            <p>To: {train.destination_station}</p>
                            <p>Class Types: {train.class_types}</p>
                        </div>
                        <button
                            className="bg-green-800 rounded-md items-end font-bold hover:bg-green-700"
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
