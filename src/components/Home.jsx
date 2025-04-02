import React from "react";
import "../styles/home.css"



function Logo(){
    return (
        
        <div className="userHome">

            <div className="logo">
                <img src={"/pictures/bear.jpeg"} alt="developer's logo" /> 
            </div>

            <div className="userDetails">
                <div className="welcome"> Welcome to Grizz Nation 💸</div>
                <div className="name"> Gaurav Kharel </div>
                <div className="occupation">Software Engineer</div>
            </div>

        </div>
    );
}

function Home(){
    return (
        <>
            <Logo />
        
        </>
    );
}

export default Home;