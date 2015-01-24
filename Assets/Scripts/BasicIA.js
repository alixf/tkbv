#pragma strict

var defaultActions = [	"idle", "moveLeft","idle", "idle", "moveRight","idle"];
var currentAction;
var clock = 0.0;
var delay = 0.5;
var detectionDistance:float;
var lifePoints:int;	
var initialPosition:Vector3;

function Start () {
	initialPosition = new Vector3(transform.position.x, transform.position.y, transform.position.z);
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
		        moveRight(false);
		        delay = 0.2;
		        break;
		    case "moveLeft":
		        moveLeft(false);
		        delay = 0.5;
		        break;
		    default:
		        idle();
		        delay = 0.7;
		}
	} else {
		if(GameObject.FindWithTag("Knight").transform.position.x > transform.position.x){
			moveRight(true);
		} else {
			moveLeft(true);
		}
	}
}

function moveLeft(attack : boolean){	
	var accelerate = attack?2:1;
	transform.Translate(Vector3.left * Time.deltaTime * accelerate);
	transform.localScale.x = -1;
	GetComponent(Animator).SetBool("Walk", !attack);
	GetComponent(Animator).SetBool("Attack", attack);	
}

function moveRight(attack : boolean){
	var accelerate = attack?2:1;
	transform.Translate(Vector3.right * Time.deltaTime * accelerate);
	transform.localScale.x = 1;
	GetComponent(Animator).SetBool("Walk", !attack);
	GetComponent(Animator).SetBool("Attack", attack);	
}

function idle() {
	GetComponent(Animator).SetBool("Walk", false);
}

function OnTriggerEnter2D (collision : Collider2D) {
	if(collision.gameObject.tag == "Sword") {
		if(lifePoints-- == 0) {
			GetComponent(Animator).SetBool("Die", true);
		}
	}
}

function Die() {
	gameObject.GetComponent(BoxCollider2D).enabled = false;
}

function Destroy() {
    gameObject.SetActive(false);
}