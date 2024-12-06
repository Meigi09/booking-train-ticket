import image from "../../assets/uni.png";
import {useNavigate} from "react-router-dom";

export default function MainContent() {
    const navigate= useNavigate();

    return(
        <>
            <div className=" flex items-center ">
                <div className=" flex flex-col justify-evenly items-start gap-6">
                    <div className="up-text flex flex-col justify-evenly items-start">
                        <div className="main-line content-[''] w-1 h-20 bg-green-900 absolute"></div>
                        <h1 className="pl-6 text-3xl font-bold">Book a train ticket <br/> here</h1>
                    </div>
                    <h2 className="text-2xl font-light">Make your trip memorable</h2>
                <p className="text-base font-thin">Search for any train line you want for any place you are going and let's get you there</p>
                <div className="flex gap-4">
                    <a 
                        className="px-6 py-3 bg-green-800 text-white font-semibold rounded-2xl cursor-pointer hover:bg-white hover:text-black transition-all"
                        onClick={() => navigate('/trainpages')}
                    >
                        Buy a Ticket <i className='bx bx-train bx-tada ml-2'></i>
                    </a>
                    <a
                        className="px-6 py-3 bg-green-800 text-white font-semibold rounded-2xl cursor-pointer hover:bg-white hover:text-black transition-all"
                        onClick={() => navigate('/admin')}
                    >
                        I'm Admin
                    </a>
                    </div>
                </div>
                <div className="flex flex-row justify-evenly gap-4 items-end">
                <img src={image} alt="Event Image" className="w-72 h-72 bg-cover bg-no-repeat bg-center order-1 justify-items-center items-end" />
            </div>
            </div>
        </>
    )

}