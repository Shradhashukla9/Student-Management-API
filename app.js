const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/students");
const axios = require("axios"); 

const app = express();
const port = process.env.PORT || 8004; 

// ** Set the URL ** 
const uri = "mongodb://127.0.0.1:27017/db"

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection established!");
}).catch((e) => {
    console.log(e);
    console.log("Connection Failure!");
});

app.use(express.json());


const externalApiUrl = "https://jsonplaceholder.typicode.com/users";


app.get("/external-students", async (req, res) => {
    try {
        const response = await axios.get(externalApiUrl);
        res.json(response.data); // Return the external API data as JSON
    } catch (error) {
        console.error("Error retrieving students from external API:", error.message);
        if (error.response) {
           
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
           
            console.error("Request data:", error.request);
            res.status(500).send("No response received from external API");
        } else {
            
            console.error("Error message:", error.message);
            res.status(500).send("Error setting up request to external API");
        }
    }
});


app.get("/students", async (req, res) => {
    try {
        const students = await Student.find({ name: 'shradha' });
        res.json(students); // Return the student data as JSON
    } catch (error) {
        res.status(500).send("Error retrieving students");
    }
});

// POST endpoint to create a new student
app.post("/students", async (req, res) => {
    const student = new Student({
        name: 'shradha',
        email: 'tushar@gmail.com',
        Phone: '123',
        address: 'xyz123'
    });
    try {
        await student.save();
        res.send("Post API Successful!");
    } catch (error) {
        res.status(500).send("Error creating student");
    }
});

// PUT endpoint to update an existing student
app.put("/students/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const student = await Student.findByIdAndUpdate(id, updates, { new: true });
        if (!student) {
            return res.status(404).send("Student not found");
        }
        res.send("Put API Successful! Updated student: " + JSON.stringify(student));
    } catch (error) {
        res.status(500).send("Error updating student");
    }
});

app.listen(port, () => {
    console.log(`Connection is setup at ${port}`);
});
