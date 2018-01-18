const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const ObjectID = require('mongodb').ObjectID;

const app = express();

//mongo-db task1


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    const dbo = db.db("usertasks");
    dbo.createCollection("users", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    dbo.createCollection("tasks", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
    //insert user
    dbo.collection("users").insertOne({name : "Naira", gender: "female"}, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    });
    //update user's name
    dbo.collection("users").updateOne({_id: new ObjectID("5a605bd73770db164867c2e0")}, {$set :{name: "Alice"}}, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
    });
    //sort by user's name
    dbo.collection("users").find({}, {  name: true, gender : true, _id : false }).sort({name : 1}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    //find only females
    dbo.collection("users").find({gender: 'female'}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
    //insert tasks
    const mytasks = [{title : "Read", text: "Read Harry Potter and the Order of Phoenix", completed: true, created: "2018-01-17 17:23:44", updated :"2018-01-18 12:23:44"}]
    dbo.collection("tasks").insertMany(mytasks, function(err, res) {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
    });
    //update tasks to completed : false
    dbo.collection("tasks").updateMany({}, {$set :{completed: false}}, function (err, res) {
        if (err) throw err;
        console.log("document updated" +res.result.nModified );
    });
    //delete completed=true
    dbo.collection("tasks").deleteMany({completed: true}, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        db.close();
    });
    //sort not completed by date of creation
    dbo.collection("tasks").find({completed : false}, ).sort({created : -1}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });

});

app.listen(3000, () => {
    console.log('server started')
});