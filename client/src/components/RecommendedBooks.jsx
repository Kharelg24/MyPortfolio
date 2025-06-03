import React from "react";
import { useState, useEffect } from "react";
import "../styles/books.css"
import { Button, FloatingLabel, Form } from "react-bootstrap";

async function deleteBook(bookId){
    try{
        const response = await fetch("http://localhost:4000/bookList", 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bookId }),
        });
    
        if (!response.ok){
            throw new Error('Network response was not ok');
        }
    
        const result = await response.json();
        return result;

    }catch(error){
        console.error("DELETE request failed:", error);
    }
}

async function postRequest({updatedBook}) {
    try{
        const response = await fetch('http://localhost:4000/readList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBook) 
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("From post request", result);
        return result;

    }catch(error){
        console.error("POST request failed:", error);
    }
}

function AddDeletePopUp({ visibilityState, setVisibilityState, book}){

    const handleClickDelete = async () => {
        await deleteBook(book.bookid)
        setVisibilityState(false);
    }

    
    const handleClickDoneReading = async () => {

        const updatedBook = { ...book, status: "read" };

        const res1 = await postRequest({ updatedBook });

        console.log("handleClickDoneReading", res1);

        setVisibilityState(false);

        handleClickDelete();
    }

    return (
        <>
            {visibilityState && (
                <div className="popup">
                    <Button className="deleteBook" onClick={handleClickDelete}>
                        Delete Book
                    </Button>

                    <Button className="doneReading" onClick={handleClickDoneReading}>
                        Book Completed
                    </Button>
                </div>
            )}
        </>
    )
}
    
function Card(props){

    const [isVisible, setVisibility] = useState(false);
    
    const handleButtonClick = () => {
        setVisibility(!isVisible);
    }

    return(
        <section className="books"> 
            <div className={"book-cards"}>
                <div className="card-front">
                    <div className="bookFont">
                        <Button className="no-effect" onClick={handleButtonClick}>
                            <AddDeletePopUp visibilityState={isVisible}  setVisibilityState={setVisibility} book={props.book}/>
                            <img src={props.book.imageurl} alt="Book Cover Page" />
                        </Button>
                    </div>    
                </div>
            </div>
        </section>
    );
}

function createCard(index, bookName, updateBookList){
    return <Card key={index} book={bookName} updateBookList={updateBookList} />;
}


async function GetBookListRequest(){
    try{
        const response = await fetch("http://localhost:4000/bookList");
        const result = await response.json();
        return result;
    }catch(err){
        console.error("Failed to fetch data", err);

    }
}


function RecommendedBooks(){

    const [bookList, setbookList] = useState([]);

    const fetchBookList = async () => {
        try{
            const result = await GetBookListRequest();
            setbookList(result);
        } catch (error){
            console.error("Failed to fetch data", error);
        }
    };

    // this runs infinitely which might slow down the website quite a lot
    useEffect(() => {
        fetchBookList();
    });

    return (
        <>
        { bookList.map((content, id) =>
            createCard(id, content, fetchBookList)) 
        }
        <div className="addBook">
            <PopUp refreshBooks={fetchBookList}/>
        </div>
        </>
    );
}

function PopUp( {refreshBooks} ){

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
            refreshBooks();
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