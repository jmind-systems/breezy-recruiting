import axios from 'axios';

const sendCandidate = (session, candidate, position) => {
    return axios.post(`https://api.breezy.hr/v3/company/${position.company_id}/position/${position._id}/candidates`, candidate, {
        headers: {
            'Authorization': session.access_token,
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        if (resp.status != 200) {
            return Promise.reject(new Error(`Response status is: ${resp.status}, statusText: ${resp.statusText}`))
        }

        return resp.data
    })
}

export { sendCandidate };