import React from "react";
import { useState, useEffect } from "react";
import "../styles/books.css"
import { Button, FloatingLabel, Form } from "react-bootstrap";

function Card(props){
    return(
        <section className="books"> 
            <div className={"book-cards"}>
                <div className="card-front">
                    <div className="bookFont">
                        <img src={props.book.imageUrl} alt="logo of the comapny" />
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
        <div className="addBook">
            <PopUp />
        </div>
        </>
    );
}

function PopUp(){

    const [isPopupVisible, setPopupVisibility] = useState(false);

    const handleButtonClick = () => {
        setPopupVisibility(!isPopupVisible)
    }

    return (
        <div className="app-container">
            <Button className="my-button" onClick={handleButtonClick}>
                Add Book
            </Button>

            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Add a new book</h2>
                        <AddBook controller={handleButtonClick}/>
                        <Button className="close-button" onClick={handleButtonClick}>
                            x
                        </Button>
                    </div>
                </div>
            )}

        </div>
    )
}

function AddBook({ controller }){
    return (
        <>
          <FloatingLabel controlId="floatingInput" label="Book Title" className="mb-3">
            <Form.Control type="title" placeholder="name@example.com" />
          </FloatingLabel>
          
          <FloatingLabel controlId="floatingAuthor" label="Author Name" className="mb-3">
            <Form.Control type="authorName" placeholder="BarackObama" />
          </FloatingLabel>

          <FloatingLabel controlId="floatingISBN" label="ISBN Number" className="mb-3">
            <Form.Control type="isbnNumber" placeholder="9781524763169" />
          </FloatingLabel>
          
          <div className="submitButton">
            <Button className="submitBook" onClick={controller}>Submit Book</Button>
          </div>
          
        </>
      );
}



export default RecommendedBooks;