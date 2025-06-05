import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url)); // to return the absolute url as a rsponse to the request

app.use(bodyParser.urlencoded({extended: true})); // gives me access to the request coming from the form in the html form

app.get("/", (req , res) => { // this handles the GET request
  res.sendFile(__dirname + "/index.html"); // returns the absolute url as a rsponse to the request
});

//Express is configured to look for EJS templates (like index.ejs) in a folder called views by default.
//make sure ur index.ejs is stored in the views folder, just create 1 and put it there

//You're telling Express: “Render the index.ejs file and give it access to a variable called name,
// whose value is whatever the user submitted through the form (req.body.name).”
app.post("/submit", (req, res) => { 
   res.render("index.ejs", { 
    name: req.body.name, // or req.body["name"]
    datemethod: adviceGiver, // giving an object a function (method) that can be called
   });
  //res.send("File is saved");  you can only send one response back to the client(request)
});

//creating a method that gets the day of the week for us and tells us what day it is and gives us an advice in return
function adviceGiver (){
    let dateCollector = new Date(); //retriving the date from the date method
    let day = dateCollector.getDay(); // accessing the day from the datecollector
    let advice = "Hey, its a weekend you can relax today";
    let advice2 = "Hey, its a weekday work hard today";
    

    if (day === 0 || day === 6){ //logic to know what reply togive
        return advice
    }else {
        return advice2
    }
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
 