import { useLocation } from 'react-router-dom';
// import QRCode from 'qrcode.react'; // Import QR Code component

export default function BookingConfirmation() {
    const { state } = useLocation();
    const reservation = state?.reservation;
    const train = state?.train;
    const trainName = train?.train_name;

    if (!reservation) {
        return <div>No reservation details found!</div>;
    }

    // You can generate a unique QR code using the reservation ID or any other unique data
    // const qrCodeData = `Reservation ID: ${reservation.reservation_id}\nTrain: ${reservation.train.train_name}\nFrom: ${reservation.from_place}\nTo: ${reservation.destination}`;

    return (
        <div className="confirmation-content flex flex-col items-center justify-between">
            <h2 className="font-bold text-2xl">Booking Confirmation</h2>
            <p><strong>Train:</strong> {trainName}</p>
            <p><strong>From:</strong> {reservation.from_place}</p>
            <p><strong>To:</strong> {reservation.destination}</p>
            <p><strong>Journey Date:</strong> {new Date(reservation.journey_date).toLocaleDateString()}</p>
            <p><strong>Class:</strong> {reservation.class_type}</p>
            <p><strong>Passenger Name:</strong> {reservation.first_name} {reservation.last_name}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Phone:</strong> {reservation.phone}</p>
            <p><strong>Payment Status:</strong> {reservation.payment_status ? 'Paid' : 'Pending'}</p>

            {/*<div>*/}
            {/*    <h3>Your QR Code</h3>*/}
            {/*    <QRCode value={qrCodeData} size={256} />*/}
            {/*</div>*/}
        </div>
    );
}
