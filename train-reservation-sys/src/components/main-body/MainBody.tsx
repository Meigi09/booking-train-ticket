import  { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainContent from "../Content/MainContent.tsx";
import TrainPages from "../Trains/TrainPages.tsx";
import Booking from "../Booking/Booking.tsx";
import './MainBody.css'
import AdminContent from "../../admin/AdminContent.tsx";
import TrainManagement from '../../admin/TrainManagement.tsx';
import UserManagement from '../../admin/UserMnagement.tsx';
import BookingConfirmation from "../Booking/BookingConfirmation.tsx";


interface MainBodyProps {
    setBackgroundColor: (color: string) => void;
}

export default function MainBody({ setBackgroundColor }: MainBodyProps) {
    const location = useLocation();

    useEffect(() => {
        // Change background color based on route
        if (location.pathname === '/trainpages') {
            setBackgroundColor('white');
        } else if (location.pathname === '/booking') {
            setBackgroundColor('lightgray');
        } else {
            setBackgroundColor('darkseagreen');
        }
    }, [location.pathname, setBackgroundColor]);

    return (

        <div className="main-body scroll-smooth focus:scroll-auto">
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/admin" element={<AdminContent/>} />
                <Route path="/trainpages" element={<TrainPages />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/admin/trains" element={<TrainManagement/>}/>
                <Route path="/admin/users" element={<UserManagement/>}/>
                <Route path="/booking-confirmation" element={<BookingConfirmation/>}/>
            </Routes>
        </div>

    )
}