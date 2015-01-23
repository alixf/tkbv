#pragma strict

var speed : float = 1.0;
var deadzone : float = 0.5;
var facing : int = 1;

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

    if(stickInput.x != 0.0)
    {
    	transform.position.x += stickInput.x * speed;
    	if(stickInput.x < 0.0)
    		facing = -1;
    	else
    		facing = 1;
    }

    if(transform.localScale.x * facing < 0.0)
    	transform.localScale.x = -transform.localScale.x;
}