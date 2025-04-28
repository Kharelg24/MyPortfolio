import express from "express";
import data from "../database/workHistory.json" with {type: "json"};
import cors from "cors";
import axios from "axios";
import multer from "multer";

import { exec } from 'child_process';
import projectData from "../database/technicalProjects.json" with {type: "json"};
import certificationData from "../database/certifications.json" with {type: "json"};
import pool from '../database/db.js'

const app = express();
const PORT = 4000;
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(cors());

let gitaCachedData = null;

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
    {/*
    pool.query(insertQuery, [bookTitle, author, status, imageUrl])
        .then(result => {
            console.log('New book inserted', result.rows[0]);
            res.status(201).json(result.rows[0]);
        })
        .catch(err => {
            console.error('Error inserting new book: ', err);
            res.status(500).json({ error: 'Failed to insert book' });
        });
    */}
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

    /*
    pool.query(deleteQuery, [bookId])
        .then(result => {
            console.log('Book has been deleted', result.rows[0]);
            res.status(201).json(result.rows[0]);
        })
        .catch(err => {
            console.error('Error deleting the book: ', err);
            res.status(500).json({ error: 'Failed to insert book' });
        });
    */
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

    /*
    pool.query(insertQuery, [booktitle, authorname, status, imageurl])
        .then(result => {
            console.log('New book inserted', result.rows[0]);
            res.status(200).json(result.rows[0]);
        })
        .catch(err => {
            console.error('Error inserting new book: ', err);
            res.status(500).json({ error: 'Failed to insert book' });
        });
    */
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
///////////////////////////File Transfer//////////////////////////////////////

app.post('/post', upload.single('file'), (req, res) => {
    
    const filePath = req.file.path;
    const {server} = req.body;

    // copying the files from windows to the bastion host server
        // ansible will take care of the rest after
    const command = `scp ${filePath} svc_aap@${server}:{/tmp/juniper.new}`;

    exec(command, (error) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({error: "File transfer failed"});
        }
        res.json({message: "File uploaded and transferred successfully"});
    })
})


////////////////////////////////////////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import { bhagavadGitaAPIOptions } from './apiOptions.js';
// this is to fetch the gita api
app.get('/chapters', async (req, res) => {
    try{

        if (gitaCachedData){
            console.log('Returning cached data');
            return res.json(gitaCachedData);
        }

        const response = await axios.request(bhagavadGitaAPIOptions);

        gitaCachedData = response.data;

        res.json(response.data);

    }catch(error){
        console.error('Error fetching Bhagvad Gita Chapters:', error);
        res.status(500).json( {error: 'Failed to fetch data from the API' });
    }
});
