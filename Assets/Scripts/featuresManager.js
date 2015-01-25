﻿#pragma strict
import UnityEngine.UI;
import System.Collections;

var enemies2:GameObject[];	
var dialogUI:GameObject;	
var firstDoor:GameObject;
var noArmor:GameObject;

var dialogs = [
[2 , "King Arthur : Fellow Knights of the Round Table. It's been 3 years, and still no sign of the Graal."],
[2 , "King Arthur : If we don't find it soon, my authority as a King will be compromised."],
[0.5 , "All : ..."],
[1 , 'Gerceval : Why did you call us "Knights of the round table ?"'],
[1 , "King Arthur : Well... You're knights soooo..."],
[1.5 , 'Gerceval : Why not "Knights of the Buffet a Vaisselle" ?'],
[0.5 , "King Arthur : ..."],
[0.5 , "All : ..."],
[1 , "King Arthur : GET OUT ! "],
[2 , 'Gerceval : If I find this sacred container, they will let me change our name to "the Knights of the Buffet à vaiselle" !'],
[2 , "Gerceval : Is that it ? In 3 years they didn't find it, right under the castle ?!"],
[1 , "Fairy : Congratulations, you found the Graal."],
[1 , "Gerceval : Thank you, bye."],
[0.5 , "Fairy : ..."],
[1 , "Fairy : Wait, you can't leave like this !"],
[0.5 , "Gerceval : Like what ?"],
[0.5 , "Fairy : You must become a real knight"],
[0.5 , "Gerceval : But am I not? It's complicated !"],
[1 , "Fairy : You have to leave all you possessions to handle the sacred Graal"],
[2 , "Gerceval : No sword ?! I hope I won't meet monsters on my way back to the castle...."],
[2 , "Gerceval : Great. A monster. And no sword. What do I do now ?"],
[2 , "Gerceval : Hey, I found the vase ! There's a bit of dirt inside however"],
[1 , "All : WHAT THE F-AIRY ?!"],
[2 , "Gerceval : So, what's our fellowship's name again ?"]
];

// Music variables
var mainMusicPlayer:AudioSource;
var actualTheme:int;

// Sound variables
var soundPlayer:AudioSource;
var stepFinished:boolean;
var currentSoundLoaded:String;
var knightAnimator:Animator;
var noArmorSound:boolean;

function Start () {
	music_init();
	sounds_init();
}

function Update () {
	sounds_checkFootstep();

	if(Input.GetKeyDown(KeyCode.Tab)) {
		music_obtainedGraal();
		StartSecondPhase();
		
	}
}

function StartGame():void {
	GameObject.FindWithTag("TitleGroup").SetActive(false);
	sounds_playMenuSelection();
	music_startIntro();
	
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
	firstDoor.SetActive(false);
	music_startTheme();
	
}

function StartSecondPhase (){
	GameObject.FindWithTag("Knight").GetComponent(KnightJump).hasArmor = false;
	for(var obj : GameObject in GameObject.FindGameObjectsWithTag("Sword")){
		obj.SetActive(false);
	}
	
	
	var currentK = GameObject.FindWithTag("Knight");

	//currentK.GetComponent(GraalActions).graalActive = true;
	
    // Instantiate the wreck game object at the same position we are at
    var noArmorK = Instantiate(noArmor, currentK.transform.position, currentK.transform.rotation);
    knightAnimator = noArmorK.GetComponentInChildren(Animator);
    Camera.main.GetComponent(Follow).target = noArmorK.transform;

    // Kill ourselves
    Destroy(currentK);

    sounds_noArmor(noArmorK);

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
























// Music Functions //

function music_init(){
	actualTheme = 1;
	mainMusicPlayer = Camera.main.GetComponent(AudioSource);
}

function music_startIntro(){
	mainMusicPlayer.Stop();
	mainMusicPlayer.clip = Resources.Load.<AudioClip>("Music/Intro");
	mainMusicPlayer.Play();
	mainMusicPlayer.loop = false; // Car la musique recommence avant que l'intro en jeu finisse
}

function music_startTheme(){
	mainMusicPlayer.loop = true; // On réactive, car désactivé dans music_startIntro()
	mainMusicPlayer.Stop();
	mainMusicPlayer.clip = Resources.Load.<AudioClip>("Music/MainTheme" + actualTheme);
	mainMusicPlayer.Play();
}

function music_nextTheme(){
	if (actualTheme < 4){
		var tmp = mainMusicPlayer.time;
		actualTheme++;
		mainMusicPlayer.Stop();
		mainMusicPlayer.clip = Resources.Load.<AudioClip>("Music/MainTheme" + actualTheme);
		mainMusicPlayer.time = tmp;
		mainMusicPlayer.Play();
	}
}

function music_obtainedGraal(){
	StartCoroutine("music_obtainedGraalAndReplayTheme");
}

function music_obtainedGraalAndReplayTheme(){
	actualTheme++;
	mainMusicPlayer.Stop();
	mainMusicPlayer.loop = false;
	mainMusicPlayer.clip = Resources.Load.<AudioClip>("Music/GraalObtained");
	mainMusicPlayer.Play();
	yield WaitForSeconds(8);
	music_startTheme();
}

// Sound Functions //

function sounds_init(){
	stepFinished = true;

	knightAnimator = GameObject.FindWithTag("Knight").GetComponentInChildren(Animator);
	soundPlayer = GameObject.FindWithTag("Knight").GetComponent(AudioSource);

	noArmorSound = false;
}

function sounds_noArmor(noArmorK:GameObject){
	soundPlayer = noArmorK.GetComponent(AudioSource);
	noArmorSound = true;
	sounds_loadFootstep();
}

function sounds_loadFootstep(){
	stepFinished = true;
	if (noArmorSound && currentSoundLoaded != "StepNoArmor"){
		soundPlayer.volume = 0.4f;
		soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/StepNoArmor");
		currentSoundLoaded = "StepNoArmor";
	}
	else if (!noArmorSound && currentSoundLoaded != "StepArmor"){
		soundPlayer.volume = 0.4f;
		soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/StepArmor");
		currentSoundLoaded = "StepArmor";
	}
}

function sounds_loadMenuSelection(){
	soundPlayer.volume = 0.4f;
	soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/MenuSelectionSFX");
	currentSoundLoaded = "MenuSelectionSFX";
}

function sounds_FootstepLoaded(){
	return ((noArmorSound && currentSoundLoaded == "StepNoArmor") || 
		(!noArmorSound && currentSoundLoaded == "StepArmor"));
}

function sounds_MenuSelectionLoaded(){
	return currentSoundLoaded == "MenuSelectionSFX";
}

function sounds_playFootstep(){
	if (!sounds_FootstepLoaded())
		sounds_loadFootstep();

	stepFinished = false;
	soundPlayer.Play();
	yield WaitForSeconds(0.3);
	stepFinished = true;
}

function sounds_checkFootstep(){
	knightAnimator = GameObject.FindWithTag("Knight").GetComponentInChildren(Animator);
	if (knightAnimator.GetCurrentAnimatorStateInfo(0).nameHash == 
		Animator.StringToHash("Base Layer.Run") && stepFinished)
		StartCoroutine("sounds_playFootstep");
}

function sounds_playMenuSelection(){
	if (!sounds_MenuSelectionLoaded())
		sounds_loadMenuSelection();

	soundPlayer.Play();
}