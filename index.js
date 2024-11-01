const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Setting up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Array of tweets;
let tweets = [
    {
        id: uuidv4(),
        username: "oiiamsaurav",
        content: "I am tweeting"
    },
    {
        id: uuidv4(),
        username: "igrainsider",
        content: "Exploring game development!"
    },
    {
        id: uuidv4(),
        username: "codewizard",
        content: "JavaScript is amazing!"
    },
    {
        id: uuidv4(),
        username: "webdevguru",
        content: "Just built a new website layout"
    }
];


// Routes
app.get("/", (req, res) => {
    res.render("index",{tweets});
});
app.post("/post",(req,res)=>{
    console.log(req.body);
    let {username,content}=req.body;
    let id=uuidv4();
    tweets.push({id,username,content});
    res.redirect("/");
    console.log("post worked");
    

})
// Edit route
app.get("/edit/:id", (req, res) => {
    const tweetId = req.params.id; 
    // console.log("Editing tweet with ID:", tweetId);
    const tweet = tweets.find(t => t.id === tweetId); 

    if (tweet) {
        res.render("edit", { tweet }); 
    } else {
        res.status(404).send("Tweet not found"); 
    }
});
// update route
app.post("/update/:id",(req,res)=>{
    const tweetId = req.params.id; 
    // console.log(tweetId);
    // console.log("inside update");
    let {newContent}=req.body;
    // console.log(newContent)
    const tweet = tweets.find(t => t.id === tweetId); 
    tweet.content=newContent;
    res.redirect("/");
})
// Delete route
app.post("/delete/:id",(req,res)=>{
    const tweetId=req.params.id;
    // console.log(tweetId);
    const tweet=tweets.find((t)=>t.id=tweetId);
    tweets.splice(tweet,1);
    res.redirect("/");
})

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
