#pragma strict
import UnityEngine.UI;

var enemies2:GameObject[];	
var dialogUI:GameObject;
var graal:GameObject;

var dialogs = [
	[2 , "King Arthur : Fellow Knights of the Round Table. It's been 3 years, and still no sign of the Graal."],
	[2 , "King Arthur : If we don't find it soon, my authority as a King will be compromised."],
	[0.5 , "All : ..."],
	[1 , 'Persifleur : Why did you call us "Knights of the round table ?"'],
	[1 , "King Arthur : Well... You're knights soooo..."],
	[1.5 , 'Persifleur : Why not "Knights of the Buffet à Vaisselle" ?'],
	[0.5 , "King Arthur : ..."],
	[0.5 , "All : ..."],
	[1 , "King Arthur : GET OUT ! "],
	[2 , 'Persifleur : If I find this sacred container, they will let me change our name to "the Knights of the Buffet à vaiselle" !'],
	[2 , "Persifleur : Is that it ? In 3 years they didn't find it, right under the castle ?!"],
	[1 , "Fairy : Congratulations, you found the Graal."],
	[1 , "Persifleur : Thank you, bye."],
	[0.5 , "Fairy : ..."],
	[1 , "Fairy : Wait, you can't leave like this !"],
	[0.5 , "Persifleur : Like what ?"],
	[0.5 , "Fairy : You must become a real knight"],
	[0.5 , "Persifleur : But am I not? It's complicated !"],
	[1 , "Fairy : You have to leave all you possessions to handle the sacred Graal"],
	[2 , "Persifleur : No sword ?! I hope I won't meet monsters on my way back to the castle...."],
	[2 , "Persifleur : Great. A monster. And no sword. What do I do now ?"],
	[2 , "Persifleur : Hey, I found the vase ! There's a bit of dirt inside however"],
	[1 , "All : WHAT THE F-AIRY ?!"],
	[2 , "Persifleur : So, what's our fellowship's name again ?"]
];

function Start () {

}

function Update () {
	if(Input.GetKeyDown(KeyCode.Tab)) {
		StartSecondPhase ();
	}
}

function StartGame():void {
	GameObject.FindWithTag("TitleGroup").SetActive(false);
	
	StartCoroutine("yieldTitle");
}

function yieldTitle() {
	var i:int;
	yield WaitForSeconds(2);
	for(i=0;i<9;i++){
		//Invoke("triggerDialog", dialogs[i][0]);
    	triggerDialog(i);
    	var timer:float = dialogs[i][0];
		yield WaitForSeconds(timer *2.2);
	}
}

function StartSecondPhase (){
	GameObject.FindWithTag("Knight").GetComponent(KnightJump).hasArmor = false;
	for(var obj : GameObject in GameObject.FindGameObjectsWithTag("Sword")){
		obj.SetActive(false);
	}
	GameObject.FindWithTag("Knight").GetComponent(GraalActions).graalActive = true;
	graal.SetActive(true);
	for(var enemy : GameObject in enemies2) {
		enemy.SetActive(true);
	}
}


function triggerDialog(i:int){
	var timer:float = dialogs[i][0];
	var mytext = dialogs[i][1];
	Invoke("killDialog", timer *2);
	dialogUI.transform.GetChild(0).GetChild(0).GetComponent(UI.Text).resizeTextForBestFit = false;
	dialogUI.transform.GetChild(0).GetChild(0).GetComponent(UI.Text).text = mytext;
	dialogUI.transform.GetChild(0).GetChild(0).GetComponent(UI.Text).resizeTextForBestFit = true;
	dialogUI.SetActive(true);
}


function killDialog () {
	dialogUI.SetActive(false);
}

