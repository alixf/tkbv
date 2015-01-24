#pragma strict
var model : Transform;
var mycollider:GameObject;
function Start ()
{
}

function Update ()
{
	// TODO add "OR ||" with controller input
	var actionBool = Input.GetKeyDown("space");
	mycollider.GetComponent(BoxCollider2D).enabled = actionBool;
	model.GetComponent(Animator).SetBool("Attack", actionBool);
	//GetComponent(BoxCollider2D).enabled = true;
	//model.GetComponent(Animator).SetBool("Attack", true);
}