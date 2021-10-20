import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function VerifyUser() {
    const history = useHistory();
    const { token } = useParams();

    const verify = async () => {
        console.log("Verified");
        try {
            const { data } = await axios.get(`http://localhost:3001/verify/${token}`);
            console.log(data);
            history.push({
                pathname: '/login'
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <div>Verified</div>
    )
}


