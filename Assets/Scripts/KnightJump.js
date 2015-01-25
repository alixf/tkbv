#pragma strict
var hasArmor:boolean;
var model : Transform;

function Start () {
}

function Update () {
	// TODO add "or" with controller input
	if(Input.GetKeyDown(KeyCode.UpArrow) && !model.GetComponent(Animator).GetBool("Jump"))
	{
		var force = hasArmor ? 1000 : 1200;
		rigidbody2D.AddForce(new Vector2(0,force));
		model.GetComponent(Animator).SetBool("Jump", true);
		
	}
	if(model.GetComponent(Animator).GetBool("Jump") && rigidbody2D.velocity.y < 0.0)
		model.GetComponent(Animator).SetBool("Fall", true);
}

function OnCollisionEnter2D(collision : Collision2D)
{
	if(collision.gameObject.CompareTag("Ground"))
	{
		model.GetComponent(Animator).SetBool("Jump", false);
		model.GetComponent(Animator).SetBool("Fall", false);
	}
}

