import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import { Collapse } from "react-bootstrap";

// Ideally creating some kind of a hide and unhide feature
function CollapsableCertification(){
    const [open, setOpen] = useState(false);

    return(
        <section className="collapsable">
            <Button className = "technicalButton" size="lg" onClick={() => setOpen(!open)}>
            {open ? "Hide Certifications" : "View Certifications"}
            </Button>

            <Collapse in={open}>
                <div>
                    <Resume />
                </div>
            </Collapse>
        
        </section>
    )
}

function Resume(){

    const [certification, setcertification] = useState([]);

    useEffect(() => {
        async function fetchCertification(){
            try {
                const response = await fetch("http://localhost:4000/certificationData");
                const result = await response.json();
                setcertification(result);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchCertification();
    }, []);


    return (
        <>
        {certification.map((certification, key) => 
            createCard(certification, key))
        }
        </>
    );
}


function createCard(certificationName, index){
    return <Card key={index} certification={certificationName}/>
}


function Card(props){

    return (
        <section className="work"> 
            <div className={"cards"}>
                <div className="card-front">
                    <div className="companylogo">
                        <img src={props.certification.imageUrl} style={ {width: "auto", height: "300px"} } alt="logo of the comapny" />
                    </div>

                    <div className="details"> 
                        <ul>
                            <li> {props.certification.certificationName}  </li>
                            <li> {props.certification.issuedDate} </li>
                            <li> Issued by: {props.certification.issuedBy} </li>
                            <li> <a href={props.certification.viewBadge}> View Badge </a> </li>

                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CollapsableCertification;