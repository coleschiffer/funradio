var info;
var count = 5;
var currentSongs = "";
var currentDjs = "";
start()
function start() {
	fetch('https://cors-anywhere.herokuapp.com/http://mc.krlx.org/api/v1/schedule/signage')
  .then(function(response) {
    return response.json();
  }).then(function(data) {
  });
  fetch('https://cors-anywhere.herokuapp.com/http://signage.krlx.org')
  .then(function(response) {
      return response.json();
  }).then(function(data) {
  	  info = data;
	  document.getElementById("songs").innerHTML = displaySongs(info,count);
  	  document.getElementById("now").innerHTML = currentShow(data);
  	  recheck();
  });
}

function displaySongs(data,count) {
  	var songs = data.songs;
  	var i = 0;
  	var songtext = "";
  	while(i < count) {
  		songtext = songtext + songs[i].title + " by " + songs[i].artist + "<br>";
  		i++;
  	}
  	return songtext;
}
function recheck() {
	setInterval(function() {
	fetch('https://cors-anywhere.herokuapp.com/http://signage.krlx.org')
  .then(function(response) {
    return response.json();
  }).then(function(data) {
  	  info = data;
  });
	var tempsave = displaySongs(info,count);
	if(tempsave.localeCompare(currentSongs)!= 0){
		currentSongs = tempsave;
		document.getElementById("songs").innerHTML = currentSongs;
		}
}, 10000);
}
function currentShow(data) {
	var djs = "";
	for (var i = data.now.djs.length - 1; i >= 0; i--) {
		djs = djs + " " + data.now.djs[i];
	}
	var djtext =  djs + '<h2 style="padding: 0px;margin: 0px;" class="dogood">'+ data.now.title + "</h2>";
	return djtext;
}
function newshowCheck() {
  
	var tempsave = displaySongs(info,count);
	if(tempsave != currentSongs){
		currentSongs = tempsave;
		document.getElementById("songs").innerHTML = currentSongs;
		}
}
var audioMp3 = new Audio();
audioMp3.src = 'http://garnet.krlx.org:8000/krlx';
var colors = ["red", "blue", "green", "maroon", "olive", "fuchsia", "lime", "teal", "aqua", "navy", "DeepPink", "purple", "black", "orange"];
document.documentElement.style.setProperty('--mainColor', colors[Math.floor(Math.random()*colors.length)]);

function playAudio(){
	audioMp3.play();
	var play = document.getElementsByClassName("all");
	for (var i = play.length - 1; i >= 0; i--) {
		play[i].innerHTML = "playing the radio";
	}
	changecolor();
	document.getElementById("stopper").style.display = "block";
	document.getElementById("louder").style.display = "block";
	document.getElementById("quieter").style.display = "block";
}

function pauseAudio(){
	audioMp3.pause();
	document.getElementById("stopper").style.display = "none";
	document.getElementById("louder").style.display = "none";
	document.getElementById("quieter").style.display = "none";
		var play = document.getElementsByClassName("all");
	for (var i = play.length - 1; i >= 0; i--) {
		play[i].innerHTML = "play the radio";
	}
}

function changecolor() {
			document.documentElement.style.setProperty('--mainColor', colors[Math.floor(Math.random()*colors.length)]);
}
function quieter() {
	if(audioMp3.volume >= .1) {
		audioMp3.volume = audioMp3.volume -.1;
	}
}
function louder() {
		if(audioMp3.volume != 1) {
		audioMp3.volume = audioMp3.volume +.1;
	}
}