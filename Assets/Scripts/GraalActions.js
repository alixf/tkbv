#pragma strict

var graal:GameObject;

function Start () {
	graal.GetComponentInChildren(Light).range = 0;
}

function Update () {

}

function OnTriggerEnter2D (collision : Collider2D) {
	if(collision.gameObject.tag == "Element") {
		var colorHalo = collision.gameObject.GetComponentInChildren(Light).color;
		Debug.Log(graal);
		graal.GetComponentInChildren(Light).range = 0.5;
		graal.GetComponentInChildren(Light).color = colorHalo;
	}
}

function OnTriggerExit2D(other : Collider2D) {
		graal.GetComponentInChildren(Light).range = 0;
}