import axios from 'axios';

const createSession = ({ email, password }) =>
    axios.post('https://api.breezy.hr/v3/signin',
        {
            email: email,
            password: password
        },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

export { createSession };