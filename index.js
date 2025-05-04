const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
const port = 4000
const uri = "mongodb+srv://fakeaddress2202:vF7cKDZz8GKUpPi9@tasks.d8jyvby.mongodb.net/?retryWrites=true&w=majority&appName=tasks"

const mongoose = require("mongoose")
mongoose.connect(uri)

const trySchema = new mongoose.Schema({
    name : String
})

const item  = mongoose.model("task",trySchema)
const todo = new item({
    name : "create todo"
})
const todo1 = new item({
    name : "delete todo"
})
const todo2 = new item({
    name : "practice dsa"
})
const todo3 = new item({
    name : "practice mern"
})
//todo.save()
//todo1.save()
//todo2.save()
//todo3.save()

app.get('/', async function(req, res){
    try {
        const foundItems = await item.find({});
        res.render("list", { ejex: foundItems });
    } catch (err) {
        console.error(err);
    }
})

app.post('/', function(req, res){
    const itemName = req.body.ele1
    const todo4 = new item({
        name : itemName
    })  
    todo4.save()
    res.redirect('/')
})

app.post('/delete', async function(req, res){
    const checked = req.body.checkbox1;
    try {
        await item.findByIdAndDelete(checked);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

app.listen(port, function(){
    console.log(`http://localhost:${port}`)
})