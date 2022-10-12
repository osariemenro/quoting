const quoteContainer = document.querySelector(".quote__view")

const quote = location.search.substring(1)
const quoteDetails = decodeURI(quote)
console.log(quoteDetails)

async function quotesGen() {
    const quotesUrl = "https://type.fit/api/quotes"

    try{
        const response = await fetch(quotesUrl)
        const data = await response.json()

        renderQuoteToDom(data)
    }
    catch(error) {
        console.log(error)
    }
}

const renderQuoteToDom = (quote) => {
    quote.forEach(el => {
        if(el.text.includes(quoteDetails)) {
            const text = document.createElement("div")
            const author = document.createElement("div")
            const wrapperContainer = document.createElement("div")

            text.textContent = el.text
            author.textContent = el.author

            wrapperContainer.appendChild(text)
            wrapperContainer.appendChild(author)
            quoteContainer.appendChild(wrapperContainer)
        }
    });
}

quotesGen()

