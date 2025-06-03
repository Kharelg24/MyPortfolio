import React from "react";
import WorkHistory from "./WorkHistory";
import TechnicalProjects from "./TechnicalProjects"
import Certifications from "./Certifications"
import Personal from "./Personal"

import "../styles/aboutme.css";

function AboutMe(){
    return (
        <>
            <section className="fun">
                <Personal />
            </section>
            
            <section className="resume">
                <WorkHistory />
                <TechnicalProjects/>
                <Certifications />
            </section>
            
        </>
    );
}

export default AboutMe;