var ownid;
var remotelist = "http://assets.idiomag.com/ext/network.js";

function showExchange() {
	ownid = chrome.extension.getURL().match(/\/\/(.*)\//)[1];
	loadScript(remotelist, loadAdvert);
}

function loadAdvert() {
	var advert = choose(ownid);	
	display(advert);
}

function choose() {
	shuffle(exc);
	for(var i = 0; i < exc.length; i++) {
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
	var div = document.getElementById("exchange");
	div.innerHTML = "Like this extension? Why not try <span id=\"exchange_link\" title=\""+advert.link+"\">"+advert.title+"</span>!";
	var exlink = document.getElementById("exchange_link");
	exlink.addEventListener("click", openExchange, true);
}

function openExchange(event) {
	item = event.currentTarget;
    chrome.tabs.create({url: item.title});
}

function loadScript(url, callback){
    var script = document.createElement("script")
    script.type = "text/javascript";
	script.onload = function(){
		callback();
	};
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}