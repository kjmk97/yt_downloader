console.log("asdfjdskaj");

// get url
// with url, get mp3
// download mp3 to users computer

var convertBtn = document.querySelector('.convert-button');
var URLinput = document.querySelector('.URL-input');
convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`);
    sendURL(URLinput.value);
});
function sendURL(URL) {
	window.location.href = `${window.location}download?URL=${URL}`;
}
