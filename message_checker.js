"use strict";
chrome.browserAction.onClicked.addListener(function() {
	window.open("https://scratch.mit.edu/messages");
	Cycle();
});

var user = prompt("Please enter your name:","")
var LastMessages = 0

const Http = new XMLHttpRequest();
const Url = 'https://api.scratch.mit.edu/users/' + user + '/messages/count';

function play(sound) {
  var audio = new Audio(sound);
  audio.play();
}

function Cycle() {
	Http.open("GET", Url);
	Http.send();

	Http.onreadystatechange=function(){
		if(this.readyState==4 && this.status==200){
			var Messages = JSON.parse(Http.responseText).count;
			if(Messages==0){
				chrome.browserAction.setBadgeText({text:""})
			} else {
				chrome.browserAction.setBadgeText({text:Messages.toString()})
			}
			if(Messages>LastMessages){
				play('Alert.wav')
			}
			else if (Messages<LastMessages && Messages!=0){
				play('Deleted.wav')
			}
			
			LastMessages = Messages;
		}
	}
}

Cycle();
chrome.browserAction.setBadgeBackgroundColor({color:"#ffab1a"});
setInterval(Cycle, 30000);
