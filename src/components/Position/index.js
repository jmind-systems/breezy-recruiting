import React, { useState } from "react";

import { sendCandidate } from './api'

const Position = ({ session, position, candidate }) => {
    let [wasSent, setWasSent] = useState(false)

    const onSendCandidate = e => {
        e.preventDefault()

        sendCandidate(session, candidate, position)
            .then((data) => {
                console.log(`Candidate was successfully sent: ${data}`)
                setWasSent(true)
            })
            .catch((err) => {
                console.log(`Unable to send candidate: ${err}`)
            })
    }

    let body;
    if (!wasSent) {
        body = <form onSubmit={onSendCandidate}>
            <label>{position.name}</label>
            <button type="submit">Send candidate</button>
        </form>
    } else {
        body = <span>Candidate was successfully sent for {position.name}</span>
    }

    return (
        <div>
            {body}
        </div>
    );
}

export default Position;