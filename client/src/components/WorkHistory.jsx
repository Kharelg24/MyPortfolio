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

    const [learnMore, learnMorePressed] = useState(false);

    return (
        <section className="work"> 
            <div className={`cards ${learnMore ? "flipped" : ""}`}>
                <div className="card-front">
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

                        <Button className="detailButton" onClick={() => learnMorePressed(!learnMore)}>
                            {learnMore ? "Show Less" : "Learn More"}
                        </Button>
                    </div>
                </div>


                <div className="card-back">
                    {learnMore && props.history.jobDescription.map((position, key) => 
                            createDescriptionCard(position, key)
                    )}
                </div>
            </div>
        </section>
    );
}


function createDescriptionCard(jobDescription, index){
    return <DescriptionCard key={index} descrip={jobDescription} />
}

function DescriptionCard(props){
    
    const data = Object.entries(props.descrip);

    return (
        <section className="description">
            <ul>
            {data.map((element, index) => {
                switch(element[0]){
                    case "position":
                        return (
                            <>
                            <hr />
                            <p className="position"> {element[1]} </p>
                            </>
                        )
                    case "date":
                        return <p> Date: {element[1]} </p>
                    case "one":
                        return <li className="responsibilities"> {element[1]} </li>
                    case "two":
                        return <li className="responsibilities"> {element[1]} </li>
                    case "three":
                        return <li className="responsibilities"> {element[1]} </li>
                    default:
                        return null;
                }
            })}
        </ul>
        </section>
    );
}





export default CollapsableWorkHistory;