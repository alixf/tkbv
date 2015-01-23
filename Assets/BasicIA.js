#pragma strict

var defaultActions = [	"idle", "moveLeft","idle", "idle", "moveRight","idle"];
var currentAction;
var clock = 0.0;
var delay:float;
var detectionDistance:float;
var lifePoints:int;	


function Start () {
	currentAction = "ilde";
}

function Update () {
	clock = clock + Time.deltaTime;
	var isKnightNear = Mathf.Abs(transform.position.x - GameObject.FindWithTag("Knight").transform.position.x) < detectionDistance;
	
	if(!isKnightNear){
		if(clock > delay) {
			clock = 0;
			currentAction = defaultActions[Mathf.Floor(Random.value * defaultActions.length)];
		}
		switch(currentAction) {
		    case "moveRight":
		        moveRight();
		        delay = 0.2;
		        break;
		    case "moveLeft":
		        moveLeft();
		        delay = 0.5;
		        break;
		    default:
		        idle();
		        delay = 0.7;
		}
	} else {
		if(GameObject.FindWithTag("Knight").transform.position.x < GameObject.FindWithTag("Knight").transform.position.x){
			moveRight();
		} else {
			moveLeft();
		}
	}
		
}

function moveLeft(){	
	transform.Translate(Vector3.left * Time.deltaTime);
}

function moveRight(){
	transform.Translate(Vector3.right * Time.deltaTime);	
}

function idle() {

}

function OnTriggerEnter2D (collision : Collider2D) {
	if(collision.gameObject.tag == "Sword") {
		if(lifePoints-- == 0) {
			gameObject.SetActive(false);
		}
	}
}