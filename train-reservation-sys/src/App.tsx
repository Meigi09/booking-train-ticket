import './App.css'
import MainBody from "./components/main-body/MainBody.tsx";
import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
    const [backgroundColor, setBackgroundColor] = useState('darkseagreen');

    return(
        <BrowserRouter>
            <section id="main" style={{ background: backgroundColor }}>
                <MainBody setBackgroundColor={setBackgroundColor}/>
            </section>
            {/*Circles */}
            <div className="circle1"></div>
            <div className="circle2"></div>
        </BrowserRouter>
    )
}