#pragma strict
var hasArmor:boolean;

function Start () {
	hasArmor = true;
}

function Update () {
	// TODO add "or" with controller input
	if(Input.GetKeyDown(KeyCode.UpArrow)){
		var force = hasArmor ? 1000 : 1400;
		rigidbody2D.AddForce(new Vector2(0,force));
	}
}