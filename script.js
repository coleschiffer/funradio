var info;
var count = 5;
var currentSongs = "";
var currentDjs = "";
var End;
var live = true;
var currentD = new Date();
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
  	console.log(data);
  	  info = data;
  	  var shows = currentShow(info);
	  document.getElementById("songs").innerHTML = displaySongs(info,count);
  	  document.getElementById("now").innerHTML = shows[0];
  	  document.getElementById("next").innerHTML = shows[1];
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
	if(End[0]<=currentD.hours &&End[1]<=currentD.minutes) {
	  shows = currentShow(info);
	  document.documentElement.style.setProperty('--mainColor', colors[Math.floor(Math.random()*colors.length)]);
  	  document.getElementById("now").innerHTML = shows[0];
  	  document.getElementById("next").innerHTML = shows[1];
	}
}, 30000);
}
function currentShow(data) {
	var djs = "";
	var djtext = ["",""];
	for (var i = data.now.djs.length - 1; i >= 0; i--) {
		djs = djs + " " + data.now.djs[i];
	}
	End = data.now.end.split(":");
	djtext[0] = '<h2 style="padding: 0px;margin: 0px;" class="dogood"><h2 style="padding: 0px;margin: 0px;"" class="dogood">' + data.now.title + "</h2>"+ djs + "<br><em>now - " + display24HourTimeAs12Hour(data.now.end) + "</em></h2>";
	djs = "";
	for (var i = data.next[0].djs.length - 1; i >= 0; i--) {
		djs = djs + " " + data.next[0].djs[i];
	}
	djtext[1] =  '<h3 style="padding: 0px;margin: 0px;" class="dogood" ><em>from ' + display24HourTimeAs12Hour(data.next[0].start) + " to " + display24HourTimeAs12Hour(data.next[0].end) + "</em><br>"+ djs + '<br>'+ data.next[0].title + "</h2></h3>";
	djs = "";
	for (var i = data.next[1].djs.length - 1; i >= 0; i--) {
		djs = djs + " " + data.next[1].djs[i];
	}
	djtext[1] =  "<em>from " + display24HourTimeAs12Hour(data.next[1].start) + " to " + display24HourTimeAs12Hour(data.next[1].end) + "</em><br>"+ djs + '<br>'+ data.next[1].title + "</h2>" + djtext[1];
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
function display24HourTimeAs12Hour(time) {
	var pm = false;
	var timeComponents = time.split(":");
	var hour = parseInt(timeComponents[0]);
	
	if(hour >= 24) hour -= 24;
	if(hour >= 12) {
		pm = true;
		hour -= 12;
	}
	if(hour == 0) hour = 12;
	timeComponents[0] = hour.toString();
	
	var returnString = timeComponents.join(":");
	return returnString + " " + (pm ? "pm" : "am");
}