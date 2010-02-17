var ownid;
var remotelist = "http://assets.idiomag.com/ext/network.js";
var loaded = false;

function showExchange() {
	// locate id of extension (for exclusion)
	ownid = chrome.extension.getURL().match(/\/\/(.*)\//)[1];
	// load remote list of link data to include
	if(!loaded) {
		loadScript(remotelist + "?" + Math.random(), loadAdvert);
	}
	else {
		loadAdvert();
	}
}

function loadAdvert() {
	// choose which link to use
	var advert = choose(ownid);	
	// display link
	display(advert);
}

function choose() {
	shuffle(exc);
	for(var i = 0; i < exc.length; i++) {
		// check not own link
		if(exc[i].id != ownid) {
			return exc[i];
			break;
		}
	}
}

function shuffle(o){
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function display(advert) {
	// identify location for link
	var div = document.getElementById("exchange");
	// add link script
	div.innerHTML = "Like this extension? Why not try <span id=\"exchange_link\" title=\""+advert.link+"\">"+advert.title+"</span>!";
	var exlink = document.getElementById("exchange_link");
	// add event listener for click
	exlink.addEventListener("click", openExchange, true);
}

function openExchange(event) {
	// open link in new tab
	item = event.currentTarget;
    chrome.tabs.create({url: item.title});
}

function loadScript(url, callback){
	// include remote list
    var script = document.createElement("script")
    script.type = "text/javascript";
	script.onload = function(){
		loaded = true;
		callback();
	};
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}