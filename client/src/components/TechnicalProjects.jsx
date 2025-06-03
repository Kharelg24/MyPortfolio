import React, {useState, useEffect} from "react";
import { Button } from 'react-bootstrap';
import { Collapse } from "react-bootstrap";

// Ideally creating some kind of a hide and unhide feature
function CollapsableTechnicalProjects(){
    const [open, setOpen] = useState(false);

    return(
        <section className="collapsable">
            <Button className = "technicalButton" size="lg" onClick={() => setOpen(!open)}>
            {open ? "Hide Technical Projects" : "View Technical Projects"}
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

    const [technicalProject, setTechnicalProject] = useState([]);

    useEffect(() => {
        async function fetchTechnicalProject(){
            try {
                const response = await fetch("http://localhost:4000/projectData");
                const result = await response.json();
                setTechnicalProject(result);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        }
        fetchTechnicalProject();
    }, []);


    return (
        <>
        {technicalProject.map((projectName, key) => 
            createCard(projectName, key))
        }
        </>
    );
}


function createCard(projectName, index){
    return <Card key={index} project={projectName}/>
}


function Card(props){

    const [learnMore, learnMorePressed] = useState(false);

    return (
        <section className="work"> 
            <div className={`cards ${learnMore ? "flipped" : ""}`}>
                <div className="card-front">
                    <div className="companylogo">
                        <img src={props.project.imageUrl} style={ {width: "auto", height: "300px"} } alt="logo of the comapny" />
                    </div>

                    <div className="details"> 
                        <ul>
                            <li> {props.project.projectName}  </li>
                            <li> {props.project.projectCreatedDate} </li>
                        </ul>

                        <Button className="detailButton" onClick={() => learnMorePressed(!learnMore)}>
                            {learnMore ? "Show Less" : "Learn More"}
                        </Button>
                    </div>
                </div>


                <div className="card-back">
                    {learnMore && props.project.projectDescription.map((description, key) => 
                            createDescriptionCard(description, key)
                    )}
                </div>
            </div>
        </section>
    );
}


function createDescriptionCard(projectDescription, index){
    return <DescriptionCard key={index} descrip={projectDescription} />
}

function DescriptionCard(props){
    
    const data = Object.entries(props.descrip);

    return (
        <section className="description">
            <ul>
            <hr />
            {data.map((element, index) => {
                switch(element[0]){
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





export default CollapsableTechnicalProjects;