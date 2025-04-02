import React from "react";
import Resume from "./Resume";

function AboutMe(){
    return (
        <>
            {console.log("before the resume component")}
            <Resume />
            {console.log("after the resume component")}
        </>
    );
}

export default AboutMe;