require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const Item = require('./models/item');
const scraping_test = require('./scraping/scraping_test');
app.use(cors());

app.set('view engine','ejs');
// console.log("Password is ",process.env.DB_PASSWORD,'df');
app.use('/',require('./controllers/item/item'));

app.get('/',async (req,res,next)=>
{
  res.render('index');
})
app.get('/item_scrap',async (req,res,next)=>
{
try
{
    const scrap = await scraping_test('ldfdf');
    res.status(200).json({message:"Scraped successfully"});
}
catch(e)
{
    e = new Error("Error in scraping");
    // e.statusCode=500;
    next(e);
}
})



//404 error handling 
app.all('*', (req, res, next) => {
    const err = new Error("Page not found");

err.statusCode=404;
  next(err);
  });

//unhandled Rejection handling
  process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    process.exit(1);
  });


//uncaught Exception handling 
process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
  });

var environment = process.env.NODE_ENV || 'development';
app.use(require('./error/error_handler'));

const port = process.env.PORT || 3010;

app.listen(port,()=>
{
    console.log("Listening on port ",port);
});

