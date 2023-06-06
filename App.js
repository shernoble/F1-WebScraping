
import fetch from "node-fetch";
import * as cheerio from "cheerio";

async function getF1data(){
    try{

        // Fetch data from URL and store the response into a const
        const response=await fetch('https://www.formula1.com/en/drivers.html');
        // console.log(response.text());
        // Convert the response into text
        const body=await response.text();
        // console.log(body);
        // Load body data
        const $=await cheerio.load(body);
        // console.log($);

        // const wrapper=$('.listing-items--wrapper');
        // console.log(wrapper.length);

        const items=[];
        // Selecting Each col-12 class name and iterate through the list
        $('.listing-items--wrapper>.row>.col-12').map((i,el) => {
            // Select the rank class name and use the text method to only grab the content
            const rank=$(el).find('.rank').text();
            const points=$(el).find('.points>.f1-wide--s').text();
            const firstName=$(el).find('.listing-item--name span:first').text();
            const lastName=$(el).find('.listing-item--name span:last').text();
            const team=$(el).find('.listing-item--team').text();
            const imgSrc=$(el).find('.listing-item--photo img').attr('data-src');
            // console.log(firstName);

            // Push the data into the items array
            items.push({
                rank,
                points,
                firstName,
                lastName,
                team,
                imgSrc
            });
        });
        console.log(items);

    }
    catch(error){
        console.log(error);
    }
}

getF1data();