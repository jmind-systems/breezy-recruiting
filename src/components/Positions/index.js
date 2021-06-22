import React from "react";

import Position from "../Position";

const Positions = ({ session, candidate, positions }) => {
    const positionsList = positions.map((p) => <Position session={session} position={p} candidate={candidate} />)

    return (
        <div>
            {positionsList}
        </div>
    );
}

export default Positions;
