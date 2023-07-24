#Beginner Instructions

Installing packages got , cheerio & express

1. Command : npm install got cheerio express body-parser
2. Command : npm init
3. Create index.js
4. npm install nodemon
5. Command : nodemon index -> to start the server
6. Command : npm install ejs -> template
7. Created Folder Views -> index.ejs (new file)
   7.1. app.set('view engine','ejs');

#Basic index.js
<code>
const express = require('express');
const app = express();
const PORT = 4000;
app.set('view engine','ejs');
app.get('/',(req,res)=>{
res.render('index');
});
app.listen(PORT,()=>{
console.log(`Server Started : Listening to PORT ${PORT}`);
});
</code>
