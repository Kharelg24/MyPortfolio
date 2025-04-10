import express from "express";
import data from "../database/workHistory.json" with {type: "json"};
import cors from "cors";
import axios from "axios";
import projectData from "../database/technicalProjects.json" with {type: "json"};
import certificationData from "../database/certifications.json" with {type: "json"};
import bookList from "../database/bookList.json" with {type: "json"};

import { bhagavadGitaAPIOptions } from './apiOptions.js';

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

// this is to reach the read book database
app.get('/bookList', (req, res) => {
    res.json(bookList);
});


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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


