import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import { Collapse } from "react-bootstrap";

// Ideally creating some kind of a hide and unhide feature
function CollapsableWorkHistory(){
    const [open, setOpen] = useState(false);

    return(
        <section className="collapsable">
            <Button className = "workButton" size="lg" onClick={() => setOpen(!open)}>
            {open ? "Hide Work History" : "View Work History"}
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

    const [workHistory, setWorkHistory] = useState([]);

    useEffect(() => {
        async function fetchWorkHistory(){
            try {
                const response = await fetch("http://localhost:4000/data");
                const result = await response.json();
                setWorkHistory(result);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchWorkHistory();
    }, []);

    return (
        <>
        {workHistory.map((companyName, key) => 
            createCard(companyName, key))
        }
        </>
    );
}


function createCard(workHistory, index){
    return <Card key={index} history={workHistory}/>
}


function Card(props){
    return (
       
        <section className="work"> 
            <div className="cards">
                <div className="companylogo">
                    <img src={props.history.imageUrl} alt="logo of the comapny" />
                </div>

                <div className="details"> 
                    <ul>
                        <li> {props.history.companyName}  </li>
                        <li> {props.history.position} </li>
                        <li> Location: {props.history.location} </li>
                        
                        <li> From: {props.history.startDate} - {props.history.endDate}</li>
                    </ul>

                    <Button className="detailButton">
                        Learn More
                    </Button>
                </div>
            </div>
        </section>
     
    )
}








export default CollapsableWorkHistory;