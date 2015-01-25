#pragma strict

var graal:GameObject;
var closeElement:String;
var fill:int;
var inside:String[];
var sourceThrow:GameObject;

function Start () {
	graal.GetComponentInChildren(Light).range = 0;
	closeElement = "none";
	fill=0;
	inside = ["none","none"];
}

function Update () {
	if(Input.GetKeyDown("space")) {
		Debug.Log(inside);
		// Rammasser. Max 2 éléments
		if(closeElement != "none" && fill < 2) {
			pickUp();
		} else if (closeElement == "none") {
			throwContent();
		}
	}
}

function pickUp (){
	inside[fill++] = closeElement;
}

function throwContent(){
Debug.Log(graal.transform.rotation.y);	
	Instantiate(sourceThrow, transform.position,transform.rotation);
}

function OnTriggerEnter2D (collision : Collider2D) {
	if(collision.gameObject.tag == "Element") {
		var colorHalo = collision.gameObject.GetComponentInChildren(Light).color;
		Debug.Log(graal);
		graal.GetComponentInChildren(Light).range = 0.5;
		graal.GetComponentInChildren(Light).color = colorHalo;
		closeElement = collision.gameObject.name; 
	}
}

function OnTriggerExit2D(other : Collider2D) {
		graal.GetComponentInChildren(Light).range = 0;
		closeElement = "none";
}