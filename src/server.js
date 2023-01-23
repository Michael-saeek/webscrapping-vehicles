const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express()
const PORT = 3333;

const pages = [1,2,3,4,5,6,7,8];

const brands = [];

const search = (page) => {
  const url = `https://www.carlogos.org/car-brands/${page > 1 ? `page-${page}.html` : ''}`;
  /* al navegar a esta pagina con axios nos retorna una promesa*/
  return axios(url);
}

const format = (response) => {
  const html = response.data
  const $ = cheerio.load(html)
  const cardContent = []

  $('.logo-list li', html).each(function() {
    const brand = $(this).find('a img').attr('alt').replace(' logo', '');
    const urlLogo = $(this).find('a img').attr('src');
    const urlClean = `https://www.carlogos.org${urlLogo}`

    brands.push({
      brand,
      logo: urlClean
    });
  })

  // console.log(cardContent)

}

Promise.all(pages.map(search))
  .then(res => {
    res.map(format);
    // console.log(brands);
    const loc = path.join(__dirname, '../../brands.json');
    fs.writeFileSync(loc, JSON.stringify(brands, null, 2));
    process.exit();
  }).catch(console.log);


/*
const $ = cheerio.load('<h2 class="title">Hello world</h2>');
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');
$.html();

*/

app.listen(PORT, () => {
  console.log(`Server ejecutandose en el servidor ${PORT}`)
})