#pragma strict

var speed = 1.0;
var deadzone = 0.5;

function Start ()
{

}

function Update ()
{
	var stickInput = new Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
    if(stickInput.magnitude < deadzone)
        stickInput = Vector2.zero;
    else
        stickInput = stickInput.normalized * ((stickInput.magnitude - deadzone) / (1 - deadzone));

    if(stickInput.x > 0.0)
    	transform.position.x += stickInput.x * speed;
}