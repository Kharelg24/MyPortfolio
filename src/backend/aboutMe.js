import express from "express";
import data from "../database/workHistory.json" with {type: "json"};
import cors from "cors";
import axios from "axios";
import projectData from "../database/technicalProjects.json" with {type: "json"};
import certificationData from "../database/certifications.json" with {type: "json"};
import bookList from "../database/bookList.json" with {type: "json"};

import pool from '../database/db.js'

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

let gitaCachedData = null;

// this is to read the work history database
app.get('/data', (req, res) => {
    res.json(data);

});

// this is to reach the technical project database
app.get('/projectData', (req, res) => {
    res.json(projectData);
});

// this is to reach the certification database
app.get('/certificationData', (req, res) => {
    res.json(certificationData);
});

////////////////////////This is for the book List//////////////////////////////
app.get('/bookList', async (req, res) => {
    try{
        const result = await pool.query(`SELECT * from bookList`);
        res.json(result.rows);

    }catch(err){
        console.error('Error fetching the bookList', err);
        res.status(500).send('Error fetching job descriptions');
    }
});

app.post('/bookList', (req, res) => {

    console.log("Server side", req.body);

    const {bookTitle, author, status, imageUrl } = req.body;
        
    const insertQuery = `
        Insert INTO bookList (bookTitle, authorName, status, imageURL)
        VALUES ($1, $2, $3, $4)
    `;

    pool.query(insertQuery, [bookTitle, author, status, imageUrl])
        .then(result => {
            console.log('New book inserted', result.rows[0]);
            res.status(201).json(result.rows[0]);
        })
        .catch(err => {
            console.error('Error inserting new book: ', err);
            res.status(500).json({ error: 'Failed to insert book' });
        });
});
///////////////////////////////////////////////////////////////////////////////////

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
