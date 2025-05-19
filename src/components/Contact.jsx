import React from "react";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";

import "../styles/contact.css"

function LeftSide(){

return (
    <>
        <div className="elements">
            <div className="header">
                <h2> Get in Touch</h2>
                <p> Get in touch with me to: </p>
               
                <li> Provide any improvement feedbacks.</li>
                <li> Ask any questions.</li>
                <li> To Connect.</li>

            </div>

        </div>
    </>
);
}


function RightSide(){
   
    const [ firstName, setFirstName ] = useState("");
        
    const [ lastName, setLastName ] = useState("");
            
    const [ email, setEmail] = useState("");

    const [message, setMessage] = useState("");
        
    function handleSubmit(e){
        alert("Thank you for your message!");
    }
            
    return (
        <>
        <form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="First Name*" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Gaurav Kharel" 
                    required
                    onChange={(e) => setFirstName(e.target.value)}/>
            </FloatingLabel>
                  
            <FloatingLabel controlId="floatingInput" label="Last Name*" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Kharel" 
                    required
                    onChange={(e) => setLastName(e.target.value)}/>
            </FloatingLabel>
        
            <FloatingLabel controlId="floatingInput" label="Email Address*" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="firstName.lastName@gmail.com"
                    required 
                    onChange={(e) => setEmail(e.target.value)}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingTexarea" label="Message*" className="mb-3">
                <Form.Control 
                    as= "textarea" 
                    placeholder="I would love to connect!"
                    required
                    style={{ height: '150px', paddingTop: '1.5rem' }}
                    onChange={(e) => setMessage(e.target.value)}/>
            </FloatingLabel>
            
            <div className="submitButton">
                <Button type="submit" className="submitBook">Send Message</Button>
            </div>
                  
        </form>
        </>
    );
}





function Contact(){
    return (
        <div className="container py-5">
            <div className="row align-items-start">
                <div className="col-lg-6">
                    <LeftSide />
                </div>
            
                <div className="col-lg-6">
                    <div className="w-100 mt-5">
                        <RightSide />
                    </div>
                </div>
            </div>
        </div>
  );
}


export default Contact;