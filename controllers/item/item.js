const app = require('express')();
const Item = require('../../models/item');

app.get('/item', async (req,res,next)=>
{
    try{
        var item_list = await Item.findAll();
        res.status(200).json(item_list);
    }
    catch(e)
    {
        e.statusCode=500;
        next(e);
    }
})


module.exports = app;