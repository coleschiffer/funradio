

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