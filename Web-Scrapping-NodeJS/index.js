const express = require('express');
const got = require('got');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 4000;

const bodyParser = require('body-parser');

const urlEncodeParser = bodyParser.urlencoded({ extended: false });
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index', { value: '', title: '' });
});
app.get('/movie', (req, res) => {
    res.render('movie', { value: '', title: '' });
});
app.post('/send-movie', urlEncodeParser, async (req, res) => {
    const url = req.body.myurl;
    await (async () => {
        const response = await got(url);
        const $ = cheerio.load(response.body);
        const title = $('h1').html();
        const value = $('span[class="sc-bde20123-1 iZlgcd"]').html();

        await res.render('movie', { value, title });
    })();
});
app.get('/job', (req, res) => {
    res.render('jobListing', {
        cat: '',
        title: '',
        company: '',
        vacancy: '',
        JobResponsibilities: '',
        EmploymentStatus: '',
        EducationalRequirements: '',
        ExperienceRequirements: '',
        AdditionalRequirements: '',
        JobLocation: '',
        Salary: '',
    });
});
app.post('/send-job', urlEncodeParser, async (req, res) => {
    const url = req.body.myurl;
    await (async () => {
        const response = await got(url);
        const $ = cheerio.load(response.body);
        const cat = $('p.category').text();
        const title = $('h2.job-title').text();
        const company = $('h3.company-name ').text();
        const vacancy = $('div.vac').html();
        const JobResponsibilities = $('div.job_des').html();
        const EmploymentStatus = $('div.job_nat').html();
        const EducationalRequirements = $('div.edu_req').html();
        const ExperienceRequirements = $('div.edu_req:eq(1)').html();
        const AdditionalRequirements = $('div.job_req').html();
        const JobLocation = $('div.job_loc ').html();
        const Salary = $('div.salary_range').html();

        await res.render('jobListing', {
            title,
            company,
            cat,
            vacancy,
            JobResponsibilities,
            EmploymentStatus,
            EducationalRequirements,
            ExperienceRequirements,
            AdditionalRequirements,
            JobLocation,
            Salary,
        });
    })();
});
app.listen(PORT, () => {
    console.log(`Server Started : Listening to PORT ${PORT}`);
});
