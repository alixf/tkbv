#pragma strict
var model : Transform;

function Start ()
{
}

function Update ()
{
	// TODO add "OR ||" with controller input
	var actionBool = Input.GetKey("space");
	GetComponent(BoxCollider2D).enabled = actionBool;
	model.GetComponent(Animator).SetBool("Attack", actionBool);
}