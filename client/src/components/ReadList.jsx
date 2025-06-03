import React from "react";
import { useState, useEffect } from "react";

function ReadList(){

    const [booksRead, setBooksRead] = useState([]);

    async function fetchReadBookList () {
            try{
                const response = await fetch("http://localhost:4000/readList");
                const result = await response.json();
                setBooksRead(result);
            } catch (error){
                console.error("Failed to fetch data", error);
            }
        };
    
        useEffect(() => {
            fetchReadBookList();
        });
    
        return (
            <>
            { booksRead.map((content, id) =>
                createCard(id, content, fetchReadBookList)) 
            }
            </>
        );
}

function createCard(index, bookName, updateBookList){
    return <Card key={index} book={bookName} updateBookList={updateBookList} />;
}

    
function Card(props){
    return(
        <section className="books"> 
            <div className={"book-cards"}>
                <div className="card-front">
                    <div className="bookFont">
                        <img src={props.book.imageurl} alt="Book Cover Page" />
                    </div>    
                </div>
            </div>
        </section>
    );
}

export default ReadList;