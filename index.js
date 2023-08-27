const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require('path');
const port = 8001;


const db = require('./config/mongoose');
const Task = require('./models/task');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));



app.get('/', async function (req, res) {

    try {
        const tasks = await Task.find({});
        return res.render('home', {
            title: "Kanban Task List",
            task_list: tasks
        });
    } catch (err) {
        console.log('Error in fetching contact from DB');
    }



})
app.post('/create-task', function (req, res) {
    async function createContact(req, res) {
        try {
            const newContact = await Task.create({
                title: req.body.name,
                description: req.body.phone
            });

            console.log('******', newContact);
            return res.redirect('back');
        } catch (err) {
            console.log('Error in creating a contact!',err);
            return;
        }
    }

    // Usage:
    createContact(req, res);

});




app.get('/delete-task/', function (req, res) {

    let id = req.query.id;
    Task.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch((err) => {
            console.log('Error in deleting an object from the database');
            return;
        });


});

app.listen(port, function (err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})