// Scripts and functions on this page are the creation of 0xR3TR0. All rights reserved.  
// Selecting DOM elements
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const synth = speechSynthesis;

// Function to fetch a random quote from an external API
function randomQuote() {
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote...";

    fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(result => {
            // Updating the quote and author in the UI
            quoteText.innerText = result.content;
            authorName.innerText = result.author;

            // Resetting the button state after fetching the quote
            quoteBtn.classList.remove("loading");
            quoteBtn.innerText = "New Quote";
        });
}

// Event listener for the speech button
speechBtn.addEventListener("click", () => {
    // Checking if the quote button is not in a loading state
    if (!quoteBtn.classList.contains("loading")) {
        // Creating a SpeechSynthesisUtterance with the quote and author
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);

        // Checking the speaking state of the speech synthesis and updating the button style
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

// Event listener for the copy button
copyBtn.addEventListener("click", () => {
    // Copying the quote text to the clipboard
    navigator.clipboard.writeText(quoteText.innerText);
});

// Event listener for the Twitter button
twitterBtn.addEventListener("click", () => {
    // Creating a tweet URL with the quote and opening it in a new window
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});

// Event listener for the quote button to fetch a new quote
quoteBtn.addEventListener("click", randomQuote);
