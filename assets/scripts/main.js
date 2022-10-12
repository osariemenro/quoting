sessionStorage.setItem("author", "Gaius")

const quotesContainer = document.querySelector(".quotes")

async function quotesGen() {
    const quotesUrl = "https://type.fit/api/quotes"

    try{
        const response = await fetch(quotesUrl)
        const data = await response.json()

        requestQuoteOfTheDayTimer(data)
        quotesListedOnDom(data)
    }
    catch(error) {
        console.log(error)
    }
}

const quotesData = (quotes) => {
    return quotes
}

// quote of the day

// get day function
const getDay = () => {
    const day = new Date().getDay()
    return day
}

// request these(prvDay and Random) from server
let prvDay = 12
let random = 1
const requestQuoteOfTheDayTimer = (data) => {
    initQuoteOfTheDay.renderDayQuote(data, random)

    setInterval(() => {
        getDay()

        if(getDay() > prvDay) {
            // save both random and prvDay to server
            random = Math.floor((this.data.length * Math.random()))
            prvDay = getDay()


            initQuoteOfTheDay.renderDayQuote(data, random)
        }  
    }, 1000)
}

class quoteOfTheDay {
    author
    quote
    dayQuote

    renderDayQuote = (quoteData, randomQoute) => { 
        this.author = quoteData[randomQoute].author
        this.quote = quoteData[randomQoute].text

        console.log(
            this.quote
        )
    }
}

const initQuoteOfTheDay = new quoteOfTheDay

// View Quotes full details

// render all quotes 
const quotesListedOnDom = (data) => {
    let maxQuotes = 0

    for(let i = 0; i < data.length; i++) {
        let quote = document.createElement("div")
        let text = document.createElement('div')
        let author = document.createElement('div')


        text.textContent = data[i].text
        author.textContent = data[i].author
        quote.appendChild(text)
        quote.appendChild(author)
        quotesContainer.appendChild(quote)

        quote.style.borderBottom = "2px solid black"
        quote.addEventListener('click', () => {
            // push clicked data to a global array
            const quoteNumClicked = i
            const quoteText = data[i].text
            const viewQuoteUrl = `/quote.html?${quoteText}`
            window.open(viewQuoteUrl, '_self')
        })

        maxQuotes++
        if(maxQuotes > 120) {
            return
        }
    }
}



quotesGen()