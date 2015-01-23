#pragma strict

var speed = 1.0;

function Start ()
{

}

function Update ()
{
	var xStick = Input.GetAxis("Horizontal");
	if(Mathf.Abs(xStick) > 0.5)
		transform.position.x += (xStick - 0.5) * 2 * speed;
}