import React, { useState, useEffect } from 'react';

import Login from './components/Login'
import Positions from './components/Positions'
import PositionLoader from './components/PositionLoader'

import { QueryClient, QueryClientProvider } from 'react-query'

const App = () => {
    const [session, setSession] = useState(null);
    const [parsed, setParsed] = useState(null);
    const [positions, setPositions] = useState([]);

    const send_parse = () => {
        const queryInfo = {
            active: true,
            currentWindow: true
        };

        chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
            chrome.tabs.sendMessage(tabs[0].id,
                {
                    message: 'PARSE_HTML',
                },
                (response) => {
                    console.log(response)
                    setParsed(response);
                });
        });
    };

    const queryClient = new QueryClient()

    useEffect(() => {
        chrome.storage.local.get(['session'], (result) => {
            setSession(result.session)
        });
    }, []);

    useEffect(() => {
        if (session) {
            chrome.storage.local.set({ 'session': session }, () => {
                console.log('Value is set to ' + JSON.stringify(session));
            });
        }
    }, [session]);

    useEffect(() => {
        chrome.storage.local.get(['positions'], (result) => {
            console.log("useEffect: ", result.positions)
            if (result.positions) {
                setPositions(result.positions)
            }
        });
    }, []);

    useEffect(() => {
        if (positions) {
            chrome.storage.local.set({ 'positions': positions }, () => {
                console.log('Value is set to ' + JSON.stringify(positions));
            });
        }
    }, [positions]);

    return (
        <QueryClientProvider client={queryClient}>
            {<div style={styles.main}>
                {!session && <Login setSession={setSession} />}
                {!parsed && <button onClick={send_parse}>Parse</button>}
                {session && parsed && <PositionLoader setPositions={setPositions} session={session} />}
                {session && parsed && <Positions session={session} candidate={parsed} positions={positions} />}
            </div>}
        </QueryClientProvider>
    );
}

const styles = {
    main: {
        width: '300px',
        height: '600px'
    }
}

export default App;
