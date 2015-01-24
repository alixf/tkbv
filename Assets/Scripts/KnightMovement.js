#pragma strict

var speed : float = 1.0;
var deadzone : float = 0.5;
var facing : int = 1;
var model : Transform;

function Start ()
{

}

function Update ()
{
	var stickInput = new Vector2(Input.GetAxisRaw("Horizontal")+Input.GetAxisRaw("Horizontal2"), 0.0);
    if(stickInput.magnitude < deadzone)
    {
        stickInput = Vector2.zero;
        model.GetComponent(Animator).SetBool("Walk", false);
    }
    else
        stickInput = stickInput.normalized * ((stickInput.magnitude - deadzone) / (1 - deadzone));

    if(stickInput.x != 0.0)
    {
        model.GetComponent(Animator).SetBool("Walk", true);
    	transform.Translate(stickInput.x * speed, 0, 0);
    	if(stickInput.x < 0.0)
    		facing = -1;
    	else
    		facing = 1;
    }

    if(transform.localScale.x * facing < 0.0)
    	transform.localScale.x = -transform.localScale.x;
}