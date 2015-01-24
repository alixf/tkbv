#pragma strict
var hasArmor:boolean;
var model : Transform;

function Start () {
	hasArmor = true;
}

function Update () {
	// TODO add "or" with controller input
	if(Input.GetKeyDown(KeyCode.UpArrow) && !model.GetComponent(Animator).GetBool("Jump"))
	{
		var force = hasArmor ? 1000 : 1200;
		rigidbody2D.AddForce(new Vector2(0,force));
		model.GetComponent(Animator).SetBool("Jump", true);
	}
}

function OnCollisionEnter2D(collision : Collision2D)
{
	if(collision.gameObject.CompareTag("Ground"))
	{
		model.GetComponent(Animator).SetBool("Jump", false);
	}
}