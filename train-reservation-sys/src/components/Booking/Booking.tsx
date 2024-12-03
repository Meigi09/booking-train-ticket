import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Booking.css';

import axios from 'axios';



interface BookingFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    classType: string;
    paymentMethod: 'now' | 'later';
}

export default function Booking() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get train details passed from previous page
    const train = location.state?.train;

    const [formData, setFormData] = useState<BookingFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        classType: train?.class_types.split(',')[0].trim() || 'Economy',
        paymentMethod: 'now'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare booking data
        const bookingData = {
            train_name: train.train_name,
            journey_date: new Date(),
            class_type: formData.classType,
            from_place: train.source_station,
            destination: train.destination_station,
            reservation_status: 'CONFIRMED',
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            payment_method: formData.paymentMethod,
        };

        try {
            // Send booking data to the backend
            const bookingResponse = await axios.post('http://localhost:8080/api/reservations', bookingData);
            console.log('Booking created:', bookingResponse.data);

            if (formData.paymentMethod === 'now') {
                // Prepare payment data
                const paymentData = {
                    booking_id: bookingResponse.data.booking_id,
                    amount_paid: "100", // Example amount
                    payment_status: false,
                    payment_date: new Date(),
                };

                // Send payment data to the backend
                const paymentResponse = await axios.post('http://localhost:8080/api/payments', paymentData);
                console.log('Payment processed:', paymentResponse.data);
            }

            // Redirect to confirmation page
            navigate('/booking-confirmation', { state: { reservation: bookingResponse.data}});
        } catch (error) {
            console.error('Error during booking:', error);
        }
    };
    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Here you would typically send the booking data to your backend
    //     console.log('Booking submitted:', formData);
    //     // Redirect to confirmation page or handle booking
    //     navigate('/booking-confirmation');
    // };

    if (!train) {
        return <div>No train selected</div>;
    }

    return (
        <div className="booking-content flex flex-col gap-6">
            <h2 className="font-bold text-2xl mt-5">Book Your Train Ticket</h2>
            <div className="booking-details font-semibold">
                <h3>{train.train_name}</h3>
                <p>From: {train.source_station} to {train.destination_station}</p>
                <p>Train Number: {train.train_number}</p>
            </div>
            <form onSubmit={handleSubmit} className="booking-form flex flex-col gap-4">
                <div className="form-group flex flex-col justify-between items-center gap-6">

                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="p-1 rounded-md"
                    />

                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="p-1 rounded-md"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="p-1 rounded-md"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="p-1 rounded-md"
                    />

                    <select
                        name="classType"
                        value={formData.classType}
                        onChange={handleInputChange}
                        className="p-1 rounded-md"
                    >
                        {train.class_types.split(',').map(classType => (
                            <option key={classType.trim()} value={classType.trim()}>
                                {classType.trim()}
                            </option>
                        ))}
                    </select>

                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="p-1 rounded-md"
                    >
                        <option value="now">Pay Now</option>
                        <option value="later">Pay Later</option>
                    </select>
                </div>
                <button type="submit" className="p-2 rounded-md bg-green-800 mb-5">
                    Book Ticket
                </button>
            </form>
        </div>
    );
}