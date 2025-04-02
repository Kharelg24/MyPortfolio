import React, {useState, useEffect} from "react";


// Ideally creating some kind of a hide and unhide feature
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
        <div className="work"> 
            <div> {props.history.companyName}</div>
        </div>
    )
}

/*
function WorkExperience() {
    return (
        <>    
        
        </>
    );
}

// I want to create a list of all the project and it's link to the repo
function TechnicalProjects(){
    return (
        <>
        
        
        </>
    ); 
}

function Education(){
    return (
        <>
        

        </>
    );
}


function GetWorkHistory(){
    const [workHistory, setWorkHistory] = useState([]);

    useEffect(() => {
        async function fetchWorkHistory() {
            const res = await fetch("http://localhost:4000/data");
            const data = await res.json();
            setWorkHistory(data);
        }

        fetchWorkHistory();
    }, []);


    return workHistory;
}
    */









export default Resume;