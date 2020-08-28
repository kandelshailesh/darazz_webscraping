const autoScroll = require('./auto_scrolling');
const puppeteer = require('puppeteer');
const Item = require('../models/item');


const scraping_test = async(url) =>
{
    try
    {
    const browser = await puppeteer.launch();
    // console.log(browser);
    const page = await browser.newPage();
    const viewport = { width: 3500, height:3500};
  
      await page.setViewport(viewport);
    const all_items = [];
    // /html/body/div[4]/div[7]/div[2]/div[1]/div/div[1]/div[2]/a/div/div[2]/div[2]/span

    for(let i = 1; i<3;i++)
    {
    await page.goto(`https://www.daraz.com.np/mobiles-tablets-accessories/?page=${i}&spm=a2a0e.11779170.cate_2.1.287d2d2bdTbczs`,{ timeout: 0 });

//     await page.goto('https://www.youtube.com/channel/UCRLEADhMcb8WUdnQ5_Alk7g');
   
    const result = await page.$$eval('.c16H9d a ',names=>
        names.map(
        name => name.textContent)
    );

 
    const price = await page.$$eval('.c3gUW0 span',names => names.map(name => name.textContent));
    // await page.click('.c2prKC');
    // const session = await page.target().createCDPSession();
    // await session.send('Emulation.setPageScaleFactor', {
    //   pageScaleFactor: 4, // 400%
    // });
    const image = await page.$$eval('.cRjKsc  img[src]' ,names => names.map(name=> name.getAttribute('src')));  
    await autoScroll(page);
    const image1 = await page.$$eval('.cRjKsc  img[src]' ,names => names.map(name=> name.getAttribute('src')));
 
    image1.forEach((data)=>
    {
        image.push(data);
    })

    console.log(image.length);
    result.forEach((name,i)=>
    {
        all_items.push({name:name,price:price[i],image_src:image[i]});
    })


//     const data1=await(await el1.getProperty('textContent')).jsonValue();
//     const data2 =await(await el2.getProperty('textContent')).jsonValue();
        }
// console.log(data1,data2);
console.log(all_items);
    const create_item = await Item.bulkCreate(all_items);
console.log("Inserted successfully");
    await browser.close();
    }catch(e)
{
    console.log(e);
}

}

module.exports =scraping_test;