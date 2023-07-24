const express = require('express');
const got = require('got');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 4000;

const bodyParser = require('body-parser');
const urlEncodeParser = bodyParser.urlencoded({extended:false});
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.render('index',{value:'',title:''});
});
app.get('/movie',(req,res)=>{
    res.render('movie',{value:'',title:''});
});
app.post('/send-movie',urlEncodeParser,async (req,res)=>{
    let url = req.body.myurl;
    await ( async ()=>{
        const response = await got(url);
        const $ = cheerio.load(response.body);
        let title = $('h1').html();
        let value = $('span[class="sc-bde20123-1 iZlgcd"]').html();
        
        await res.render('movie',{value:value,title:title});
        
    })();
});
app.listen(PORT,()=>{
    console.log(`Server Started : Listening to PORT ${PORT}`);
});