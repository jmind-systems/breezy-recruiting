import axios from 'axios';

const fetchPositions = (session) => {
    return fetchCompanies(session).then((companies) => {
        const promises = []

        for (let company of companies) {
            const promise = fetchCompanyPositions(session, company)
            promises.push(promise)
        }

        return Promise.all(promises).then((values) => {
            let result = []

            for (let positions of values) {
                result.push(...positions)
            }

            return result
        })
    })
}

const fetchCompanies = (session) => {
    return axios.get('https://api.breezy.hr/v3/companies', {
        headers: {
            'Authorization': session.access_token,
            'Content-Type': 'application/json'
        }
    }).then((resp) => {
        if (!Array.isArray(resp.data)) {
            console.log(`Unable to fetch companies: ${resp.status} ${resp.statusText}`)
            return []
        }

        return resp.data
    })
}

const fetchCompanyPositions = (session, company) => {
    return axios.get(`https://api.breezy.hr/v3/company/${company._id}/positions`, {
        headers: {
            'Authorization': session.access_token,
            'Content-Type': 'application/json'
        }
    }).then((r) => {
        if (Array.isArray(r.data)) {

            return r.data.map((p) => {
                p.company_id = company._id
                return p
            })
        } else {
            console.log(`Unable to fetch vacancies for company ${company._id}: ${resp.status} ${resp.statusText}`)
            return []
        }
    })
}

export { fetchPositions };
