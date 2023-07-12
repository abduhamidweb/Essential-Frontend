import { useState } from 'react';
import API from '../../API/API';
import { useNavigate } from 'react-router-dom';

const AUH = () => {
    const [sa, asxd] = useState('');
    let navigate = useNavigate()
    async function submit(e) {
        e.preventDefault()
        e.preventDefault();
        let { token } = await API.API.postUser({ username: sa });
        if (token) navigate("/");
        token ? localStorage.setItem("token", token) : undefined;
    }
    return (
        <>
            <form onSubmit={(e) => submit(e)}>
                <input type="text" className="form-control mt-2" value={sa} onChange={(e) => asxd(e.target.value)} />
                <button type="submit">submit</button>
            </form>
        </>
    );
};

export default AUH;