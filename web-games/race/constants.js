//Get the canvas context
const ctx = document.getElementById("race").getContext("2d");

//Get the banana image
const bananaImg = document.getElementById("banana");
//Get protein image
const proteinImg = document.getElementById("protein"); //Gasoline is too expensive, use protein powder instead

//Track and checkpoints
const track = "...................." +
			  ".##X############X##." +
			  ".##X####....####X##." +
			  ".##...########...##." +
			  ".##....######....##." +
			  ".##..............##." +
			  ".##.........###X###." +
			  ".##XXX#########X###." +
			  ".##XXX########......" +
			  "....................";
const checkpoints = [ 165, 155, 56, 43 ];
