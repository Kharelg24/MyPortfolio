import React from "react";
import { useState, useEffect } from "react";
import "../styles/books.css"

function Card(props){
    return(
        <section className="books"> 
            <div className={"cards"}>
                <div className="card-front">
                    <div className="bookFont">
                        <img src={props.book.imageUrl} alt="logo of the comapny" />
                    </div>

                    <div className="details"> 
                        <ul>
                            <li> {props.book.title}  </li>
                            <li> {props.book.author} </li>
                            <li> {props.book.status} </li>
                            <li> {props.book.rating} </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

function createCard(index, bookName){
    return <Card key={index} book={bookName} />;
}

function RecommendedBooks(){

    const [bookList, setbookList] = useState([]);

    useEffect(() => {
        async function fetchBookList(){
            try{
                const response = await fetch("http://localhost:4000/bookList");
                const result = await response.json();
                setbookList(result);
            } catch (error){
                console.error("Failed to fetch data", error);
            }
        }
        fetchBookList();
    })

    return (
        <>
        { bookList.map((content, id) =>
            createCard(id, content)) 
        }
        </>
    );
}


export default RecommendedBooks;