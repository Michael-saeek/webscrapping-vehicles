const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express()
const PORT = 3333;


const url = `https://www.carlogos.org/car-brands/`

/* al navegar a esta pagina con axios nos retorna una promesa*/
axios(url)
  .then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const cardContent = []


    $('.logo-list li', html).each(function() {
      const brand = $(this).find('a img').attr('alt')
      const urlLogo = $(this).find('a img').attr('src');
      const urlClean = `https://www.carlogos.org${urlLogo}`

      cardContent.push({
        brand,
        logo: urlClean
      })

    })

    console.log(cardContent)
  
  })


/*
const $ = cheerio.load('<h2 class="title">Hello world</h2>');
$('h2.title').text('Hello there!');
$('h2').addClass('welcome');
$.html();

*/

app.listen(PORT, () => {
  console.log(`Server ejecutandose en el servidor ${PORT}`)
})