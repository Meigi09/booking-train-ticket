
import { useNavigate} from 'react-router-dom';

const BackButton = () => {
    let navigate = useNavigate();
    return (
        <>
            <button onClick={() => navigate(-1)} className="top-3 left-4">Back</button>
        </>
    );
};
export default BackButton;
