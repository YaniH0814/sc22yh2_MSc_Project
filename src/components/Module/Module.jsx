/*
     Author Name: Yani Huang
    Combine ModuleButton and ModuleProgress.
*/

import React from "react";
import ClickableModule from "../ClickableModule/ClickableModule";
import Progress from "../ModuleProgressBar/ModuleProgressBar";


export default function Module(props) {
    //Combine ModuleButton and ModuleProgress
    return (
        <div style={{ display: "inline-block", margin: 10 }}>
            <ClickableModule {...props} />
            <Progress {...props} />
        </div>
    );
}
