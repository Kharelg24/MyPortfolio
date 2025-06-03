import express from "express";
import data from "../database/workHistory.json" with {type: "json"};
import cors from "cors";


import projectData from "../database/technicalProjects.json" with {type: "json"};
import certificationData from "../database/certifications.json" with {type: "json"};
import pool from '../database/db.js'

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());


// this is to get the work history database
app.get('/data', (req, res) => {
    res.json(data);

});

// this is to get the technical project database
app.get('/projectData', (req, res) => {
    res.json(projectData);
});

// this is to get the certification database
app.get('/certificationData', (req, res) => {
    res.json(certificationData);
});

////////////////////////This is for the book List//////////////////////////////
app.get('/bookList', async (req, res) => {
    try{
        const result = await pool.query(`SELECT * from bookList`);
        res.json(result.rows);

    }catch(error){
        console.error('Error fetching the bookList', error);
        res.status(500).send('Error fetching job descriptions');
    }
});

app.post('/bookList', async (req, res) => {

    console.log("Server side", req.body);

    const {bookTitle, author, status, imageUrl } = req.body;
        
    const insertQuery = `
        Insert INTO bookList (bookTitle, authorName, status, imageURL)
        VALUES ($1, $2, $3, $4)
    `;

    try{
        const result = await pool.query(insertQuery, [bookTitle, author, status, imageUrl]);
        res.status(201).json(result.rows[0]);

    }catch (error) {
        console.error("Error inserting a book", error);
        res.status(500).send("Error inserting the book");
    }
});

app.delete('/bookList', async (req, res) => {
    
    const bookId = req.body.bookId;

    const deleteQuery = `
        DELETE FROM bookList 
        WHERE bookid = $1
        RETURNING *
    `;

    try{
        const result = await pool.query(deleteQuery, [bookId]);
        res.status(201).json(result.rows[0]);

    }catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send("Error deleting a book");
    }
});

///////////////////////////////////////////////////////////////////////////////////
///////////////////////// This is for the read book List //////////////////////////
app.post('/readList', async (req, res) => {

    console.log("Server side", req.body);

    const {booktitle, authorname, status, imageurl } = req.body;

    console.log("From read List", booktitle, authorname, status, imageurl);
        
    const insertQuery = `
        Insert INTO readlist (bookTitle, authorName, status, imageURL)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    try{
        const result = await pool.query(insertQuery, [booktitle, authorname, status, imageurl]);
        res.status(201).json(result.rows[0]);

    }catch(error) {
        console.error("Error inserting a book", error);
        res.status(500).send("Error inserting the book");
    }
});

app.get('/readList', async (req, res) => {
    try{
        const result = await pool.query(`SELECT * from readList`);
        res.json(result.rows);

    }catch(err){
        console.error('Error fetching the bookList', err);
        res.status(500).send('Error fetching job descriptions');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
