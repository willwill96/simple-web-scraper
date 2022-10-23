import {ClientFunction} from 'testcafe'
import fs from 'fs'
const getPetInfo = new ClientFunction(()=>Array.from(document.querySelectorAll('pfdc-pet-card')).map((petfinderCard)=>{
    const anchor = petfinderCard.querySelector('a')
    const href = anchor.href
    const body = anchor.querySelector('.petCard-body')
    const name = body.querySelector('.petCard-body-details-hdg span').innerHTML
    const age = body.querySelector('ul ul li').innerHTML
    const breed = body.querySelector('ul ul li pf-truncate').innerHTML
    return {
        name,
        age,
        href,
        breed
    }
}))

fixture`Web Scraping`
    .page`https://www.petfinder.com/search/dogs-for-adoption/us/il/chicago/`;

test('web scraper', async t => {
    const petInfo = await getPetInfo()
    fs.writeFileSync('pet-data-1.json', JSON.stringify(petInfo))
})