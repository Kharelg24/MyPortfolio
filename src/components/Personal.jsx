import React from "react";

import "../styles/personal.css";

function Personal(){
    return (
        <>  
        <div className="top-side">
            <section className="selfPortrait">
                <img src="/pictures/ME.jpeg" alt="developer" />
                <ol>
                    <li>Gaurav Kharel</li>
                    <li>Graduated from Virginia Tech (Class of 2024)</li>
                    <li>Major: Computer Engineering | Minor: Computer Science</li>
                    <li> Software Engineer @ Booz | Allen | Hamilton</li>
                </ol>
            </section>

            <section className="aboutMe">
                <h2>About Me</h2>
                
            </section>
            </div>
        </>
    );
}


export default Personal;