import express from "express";
import data from "../database/workHistory.json" with {type: "json"};
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// this is to read the work history database
app.get('/data', (req, res) => {
    res.json(data);

});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


