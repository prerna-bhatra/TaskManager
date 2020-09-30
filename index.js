const ports = process.env.PORT || 5000;
const Task=require('./src/modeles/task')
const taskRouter=require('./src/routers/task')
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const CronJob = require('cron').CronJob;
var cors = require('cors');

const {cronf}=require('./src/cronfile')
const app=express()
const router = express.Router();

app.use(cors())
app.use(express.json())
app.use(taskRouter)

async function main(){
    await cronf();
}
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/file.html'));
    //__dirname : It will resolve to your project folder.
  });

new CronJob('* * * * * *', function() {
   main();
 }, null, true, 'Asia/Kolkata');



mongoose.connect(
    'mongodb+srv://prerna:Prerna123@cluster0.jokxx.mongodb.net/todolist?retryWrites=true&w=majority', { useNewUrlParser: true }
).then(

    app.listen(ports,  ()=> {
        console.log("Server running at "+ports);
    })
).catch(err => {
    console.log(err);
})
