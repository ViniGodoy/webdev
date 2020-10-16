import React from "react";

function WrittenBy(props) {
    return (
        <address>
            Written by <a href={"mailto:" + props.email}>{props.name}</a>
        </address>
    )
}

export default WrittenBy;