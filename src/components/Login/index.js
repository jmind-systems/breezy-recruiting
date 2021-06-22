import React, { useState } from "react";

import { useMutation } from 'react-query'
import { createSession } from './api'

const Login = ({ setSession }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error, mutate } = useMutation(createSession)

    const onCreateSession = e => {
        e.preventDefault()
        mutate({ email, password }, {
            onSuccess: (resp) => {
                setSession(resp.data)
            }
        });
    }

    return (
        <form onSubmit={onCreateSession}>
            {error && (
                <h5 onClick={() => mutation.reset()}>{error}</h5>
            )}
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
