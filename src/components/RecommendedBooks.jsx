import React from "react";
import { useState, useEffect } from "react";
import "../styles/books.css"
import { Button, FloatingLabel, Form } from "react-bootstrap";


function HandleDeleteBook(){
    
}

function Card(props){
    return(
        <section className="books"> 
            <div className={"book-cards"}>
                <div className="card-front">
                    <div className="bookFont">
                        <img src={props.book.imageurl} alt="Book Cover Page" />
                    </div>
                    <Button className="smallButton" onClick={HandleDeleteBook}> x </Button>    
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

    console.log(bookList);

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

    const handleBookSubmit = ({ bookTitle, author, isbn }) => {
        
        const data = (
            {
                "bookTitle": bookTitle,
                "author": author,
                "status": "pending",
                "imageUrl": `https://covers.openlibrary.org/b/isbn/${isbn}.jpg`,
            }
        )

        fetch('http://localhost:4000/bookList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            return result;
        })
        .catch(error => {
            console.error("POST request failed:", error);
        });

        setPopupVisibility(false);
    };

    return (
        <div className="app-container">
            <Button className="my-button" onClick={handleButtonClick}>
                Add Book
            </Button>

            {isPopupVisible && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h2>Add a new book</h2>
                        <AddBook onSubmit={handleBookSubmit}/>
                        <Button className="close-button" onClick={handleButtonClick}>
                            x
                        </Button>
                    </div>
                </div>
            )}
            
        </div>
    )
}

function AddBook({ onSubmit }){
    const [ bookTitle, setBookTitle ] = useState("");

    const [ author, setAuthorTitle ] = useState("");
    
    const [ isbn, setIsbn] = useState("");

    const status = "pending";


    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({
            bookTitle,
            author, 
            isbn
        });
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Book Title" className="mb-3">
            <Form.Control 
                type="text" 
                placeholder="name@example.com" 
                onChange={(e) => setBookTitle(e.target.value)}/>
          </FloatingLabel>
          
          <FloatingLabel controlId="floatingAuthor" label="Author Name" className="mb-3">
            <Form.Control 
                type="text" 
                placeholder="BarackObama" 
                onChange={(e) => setAuthorTitle(e.target.value)}/>
          </FloatingLabel>

          <FloatingLabel controlId="floatingISBN" label="ISBN-10 Number" className="mb-3">
            <Form.Control 
                type="text" 
                placeholder="9781524763169"
                required 
                onChange={(e) => setIsbn(e.target.value.replace(/-/g, ""))}/>
          </FloatingLabel>
          
          <div className="submitButton">
            <Button type="submit" className="submitBook">Submit Book</Button>
          </div>
        </form>
        </>
    );
}

export default RecommendedBooks;