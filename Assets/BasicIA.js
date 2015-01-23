#pragma strict

var defaultActions = ["moveRight", "moveLeft", "idle"];
var currentAction;
var clock = 0.0;

function Start () {
	currentAction = "ilde";
}

function Update () {
	clock = clock + Time.deltaTime;
	var isKnightNear = false;
	if(!isKnightNear){
		if(clock > 0.5) {
			clock = 0;
			currentAction = defaultActions[Mathf.Floor(Random.value * defaultActions.length)];
		}
		switch(currentAction) {
		    case "moveRight":
		        moveRight();
		        break;
		    case "moveLeft":
		        moveLeft();
		        break;
		    default:
		        idle();
		}
		
	}
}

function moveLeft(){
	transform.position.x -= 0.05;	
}

function moveRight(){
	transform.position.x += 0.05;	
}

function idle() {

}