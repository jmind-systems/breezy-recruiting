import React, { useState, useEffect } from "react";

import { useMutation } from 'react-query'
import { fetchPositions } from './api'

const PositionLoader = ({ session, setPositions }) => {
    const { mutate } = useMutation(fetchPositions)

    const onLoadPositions = e => {
        e.preventDefault()
        mutate(session, {
            onSuccess: (data) => {
                setPositions(data)
            },
            onError: (err) => {
                console.log(`Unable to load positions: ${err}`)
                setPositions([])
            }
        });
    }

    return (
        <form onSubmit={onLoadPositions}>
            <button type="submit">Load positions</button>
        </form>
    );
}

export default PositionLoader;
