import React from "react";
import { useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import emailjs from 'emailjs-com';

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
        
    async function handleSubmit(e){
        e.preventDefault();
        
        emailjs.sendForm(
            'service_3tygo28', // service id
            'template_udtlet2', // template id
            e.target,
            'Q4H62vXlgRUep2Nlo' // public key
        ).then(
            (result) => {
                alert("Message sent successfuly!");
            },
            (error) => {
                alert("Failed to send message, Try again.");
                console.error(error);
            }
        )
    }
            
    return (
        <>
        <form onSubmit={handleSubmit}>
            <FloatingLabel controlId="floatingInput" label="First Name*" className="mb-3">
                <Form.Control 
                    type="text" 
                    name = "firstName"
                    placeholder="Gaurav" 
                    required
                    onChange={(e) => setFirstName(e.target.value)}/>
            </FloatingLabel>
                  
            <FloatingLabel controlId="floatingInput" label="Last Name*" className="mb-3">
                <Form.Control 
                    type="text" 
                    name="lastName"
                    placeholder="Kharel" 
                    required
                    onChange={(e) => setLastName(e.target.value)}/>
            </FloatingLabel>
        
            <FloatingLabel controlId="floatingInput" label="Email Address*" className="mb-3">
                <Form.Control 
                    type="text" 
                    name="email"
                    placeholder="firstName.lastName@gmail.com"
                    required 
                    onChange={(e) => setEmail(e.target.value)}/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingTexarea" label="Message*" className="mb-3">
                <Form.Control 
                    as= "textarea" 
                    name="message"
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