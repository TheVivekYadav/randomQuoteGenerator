async function getRandomQuote(url){
	const options = {method: 'GET', headers: {accept: 'application/json'}};
	try {
		const response = await fetch(url, options);
		const data = await response.json();

		//console.log(JSON.stringify(data.data.author));
		//console.log(JSON.stringify(data.data.content));
		const author = JSON.parse(JSON.stringify(data.data.author));
		const content = JSON.parse(JSON.stringify(data.data.content));
		//
		return {author, content};

	} catch (error) {
		console.error(error);
	}
}

// This function displays Autor and Quote on the page
function displayQuote(author, quote){
	const conatiner = document.getElementById('container');
	const card = document.createElement('div');
	container.innerHTML = "";
	
	card.id = 'card';
	card.innerHTML =`
	<div class="author">
		<h1>${author}</h1>
	</div>
	<div class="quote">
		<p id="quote-text">${quote}</p>
	</div>
	<div>
		<button id="copy-to-clipboard">Copy To Clipboard</button>
	</div>
	<div>
		<button id="new-quote">New Quote</button>
	</div>
	`
	
	container.appendChild(card);

	const quoteText = document.getElementById('quote-text');

	const copyToClipboardBtn = document.getElementById("copy-to-clipboard");
	copyToClipboardBtn.addEventListener('click', ()=>{

	 copyToClipBoard(quoteText.innerText);
	});

	const newQuoteBtn =  document.getElementById('new-quote');
	newQuoteBtn.addEventListener('click', ()=>{
	loadQuote();
	});
}

//this function loads the randomQuote
async function loadQuote(){
	const {author, content} = await getRandomQuote("https://api.freeapi.app/api/v1/public/quotes/quote/random");
	displayQuote(author, content);	
}

async function copyToClipBoard(content) {
    try {
        await navigator.clipboard.writeText(content);
        console.log("Saved to clipboard");
    } catch (error) {
        console.error("Clipboard write failed:", error);
    }
}

loadQuote();


