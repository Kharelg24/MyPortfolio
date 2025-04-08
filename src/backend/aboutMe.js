import express from "express";
import data from "../database/workHistory.json" with {type: "json"};
import cors from "cors";
import projectData from "../database/technicalProjects.json" with {type: "json"};
import certificationData from "../database/certifications.json" with {type: "json"};

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


