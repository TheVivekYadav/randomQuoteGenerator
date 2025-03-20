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
		<h1 title="Author">${author}</h1>
	</div>
	<div class="quote">
		<p id="quote-text" title="Quote">${quote}</p>
	</div>
	<div id="buttons">
	<div>
		<button id="copy-to-clipboard" title="Copy To Clipboard">Copy To Clipboard</button>
	</div>
	<div>
		<button id="new-quote" title="New Quote">New Quote</button>
	</div>
		<div>
			<button id="share-to-x" style="padding:0">
<svg width=40 height=40 xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 509.64"><rect width="512" height="509.64" rx="115.61" ry="115.61"/><path fill="#fff" fill-rule="nonzero" d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"/></svg>
</button>
		</div>
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

	const xBtn = document.getElementById("share-to-x");
	xBtn.addEventListener('click', ()=>{
	shareOnX(quote,author);
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

function shareOnX(quote, author) {
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(twitterUrl, "_blank");
}

loadQuote();


