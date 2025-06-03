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
                <p>
                I’m someone who always strives for the best. I’m motivated, ambitious, and I like to think I’m hard-working. Staying fit and eating clean is a big part of my life—I love working out and keeping my nutrition on point. I’m always looking for ways to improve myself and learn something new. I enjoy being around people, trying new food, and exploring different places. I’m really into experiencing new cultures, and one of my goals is to visit all 7 wonders of the world. So far, I’ve checked off two, but there will be more to come! 
                </p>
                
            </section>
            </div>
        </>
    );
}


export default Personal;