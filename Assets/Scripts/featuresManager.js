#pragma strict
var enemies2:GameObject[];	

function Start () {

}

function Update () {
	if(Input.GetKeyDown(KeyCode.Tab)) {
		StartSecondPhase ();
	}
}

function StartSecondPhase (){
	GameObject.FindWithTag("Knight").GetComponent(KnightJump).hasArmor = false;
	GameObject.FindWithTag("Sword").SetActive(false);
	GameObject.FindWithTag("Graal").GetComponent(GraalActions).graalActive = true;
	//var enemies = GameObject.FindGameObjectsWithTag("Enemy");
	for(var enemy : GameObject in enemies2) {
		enemy.SetActive(true);
	}
}