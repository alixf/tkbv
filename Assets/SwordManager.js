#pragma strict

function Start () {

}

function Update () {
	// TODO add "OR ||" with controller input
	var actionBool = Input.GetKeyDown("space");
	GetComponent(BoxCollider2D).enabled = actionBool;
}