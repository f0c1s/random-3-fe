import React from 'react';
import {Badge} from "react-bootstrap";

function Moves(props) {
    const moves = props.moves;
    return (
        <Badge variant={"success"}>
            {
                moves > 0 && moves + " moves"
            }
        </Badge>
    );
}

export default Moves;