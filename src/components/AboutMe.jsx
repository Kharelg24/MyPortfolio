import React from "react";
import WorkHistory from "./WorkHistory";
import TechnicalProjects from "./TechnicalProjects"

import "../styles/aboutme.css";

function AboutMe(){
    return (
        <>
            <section className="resume">
                {console.log("before the workHistory component")}
                <WorkHistory />
                {console.log("after the workHistory component")}
                <TechnicalProjects/>
            </section>
            
        </>
    );
}

export default AboutMe;