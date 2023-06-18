/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Stephanie Rose Calma      Student ID: 124746223      Date: June 17, 2023
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
const express = require('express');
const path = require('path');
const collegeData = require('./modules/collegeData');
var app = express();

app.use(express.static(path.join(__dirname, 'views')));

app.get('/students', (req, res) => {
    const { course } = req.query;
    if (course) {
        collegeData.getStudentsByCourse(Number(course))
        .then(students => {
            if (students.length === 0) {
                res.json({ message: "no results" });
            } 
            else {
                res.json(students);
            }
        })
        .catch(() => {
            res.json({ message: "no results" });
        });
    } 
    
    else {
        collegeData.getAllStudents()
        .then(students => {
            if (students.length === 0) {
                res.json({ message: "no results" });
            } 
            
            else {
                res.json(students);
            }
        })
        .catch(() => {
            res.json({ message: "no results" });
        });
    }
});

app.get('/tas', (req, res) => {
    collegeData.getTAs()
    .then(tas => {
        if (tas.length === 0) {
            res.json({ message: "no results" });
        } 
        
        else {
            res.json(tas);
        }
    })
    .catch(() => {
        res.json({ message: "no results" });
    });
});

app.get('/courses', (req, res) => {
    collegeData.getCourses()
    .then(courses => {
        if (courses.length === 0) {
            res.json({ message: "no results" });
        } 
        
        else {
            res.json(courses);
        }
    })
    .catch(() => {
        res.json({ message: "no results" });
    });
});

app.get('/student/:num', (req, res) => {
    const num = req.params.num;
    
    collegeData.getStudentByNum(num)
    .then(student => {
        res.json(student);
    })
    .catch(() => {
        res.json({ message: "no results" });
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/htmlDemo', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'htmlDemo.html'));
});

app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.error('Error initializing data:', err);
    });
