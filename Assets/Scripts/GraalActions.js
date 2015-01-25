#pragma strict

var graal:GameObject;
var closeElement:String;
var closeColor : Color;
var fill:int;
var inside:String[];
var throwPrefabs : Transform[];
var finalElement : String;
var graalUI:GameObject;
var UIwater:Sprite;
var UIfire:Sprite;
var UIfood:Sprite;
var UIearth:Sprite;
var UIdust:Sprite;
var UIbomb:Sprite;
var UIoil:Sprite;
var UImud:Sprite;

var soundPlayer:AudioSource;

function Start ()
{
	graal.GetComponentInChildren(Light).range = 0;
	closeElement = "none";
	finalElement = "none";
	fill = 0;
	inside = ["none","none"];
}

function Update ()
{
	if(Input.GetKeyDown("space"))
	{
		if(closeElement != "none")
		{
			if(fill == 0)
			{
				finalElement = closeElement;
				pickUp(closeElement);
			}
			else if(fill == 1)
			{
				if((inside[0] == "fire" && closeElement == "oil") || (inside[0] == "oil" && closeElement == "fire"))
				{
					finalElement = "bomb";	
					if(inside[0] == "fire") {
						pickUp("oil");
					} else {
						pickUp("fire");
					}
				}
				else if((inside[0] == "water" && closeElement == "earth") || (inside[0] == "earth" && closeElement == "water"))
				{
					finalElement = "mud";
					if(inside[0] == "water") {
						pickUp("earth");
					} else {
						pickUp("water");
					}
				}
				else
					throwContent(finalElement);
			}
		}
		else if(finalElement != "none")
			throwContent(finalElement);

	}
}

function defineGlow()
{
	if(closeElement == null || closeElement == "none")
	{
		graal.GetComponentInChildren(Light).range = 0.0;
	}
	else if(fill == 0)
	{
		graal.GetComponentInChildren(Light).range = 0.5;
		graal.GetComponentInChildren(Light).color = closeColor;
	}
	else if(fill == 1)
	{
		var colorHalo = null;

		if(closeElement == "fire" && inside[0] == "oil")
			colorHalo = closeColor;
		else if(closeElement == "oil" && inside[0] == "fire")
			colorHalo = closeColor;
		else if(closeElement == "water" && inside[0] == "earth")
			colorHalo = closeColor;
		else if(closeElement == "earth" && inside[0] == "water")
			colorHalo = closeColor;

		if(colorHalo != null)
		{
			graal.GetComponentInChildren(Light).range = 0.5;
			graal.GetComponentInChildren(Light).color = colorHalo;
		}
		else
			graal.GetComponentInChildren(Light).range = 0.0;
	}
}

function pickUp(element : String)
{
	inside[fill++] = element;
	sounds_playGetItem();

	if(fill == 1) {
		switch(element)
		{
			case "fire" :  GameObject.FindWithTag("Image1").GetComponent(Image).sprite = UIfire;break;
			case "earth" : GameObject.FindWithTag("Image1").GetComponent(Image).sprite = UIearth;break;
			case "oil" :   GameObject.FindWithTag("Image1").GetComponent(Image).sprite = UIoil;break;
			case "dust" :  GameObject.FindWithTag("Image1").GetComponent(Image).sprite = UIdust;break;
			case "food" :  GameObject.FindWithTag("Image1").GetComponent(Image).sprite = UIfood;break;
			case "water" : GameObject.FindWithTag("Image1").GetComponent(Image).sprite = UIwater;break;
		}
		GameObject.FindWithTag("Image1").GetComponent(Image).color.a = 255;
	} else if(fill == 2) {
		switch(element)
		{
			case "fire" :  GameObject.FindWithTag("Image2").GetComponent(Image).sprite = UIfire;break;
			case "earth" : GameObject.FindWithTag("Image2").GetComponent(Image).sprite = UIearth;break;
			case "oil" :   GameObject.FindWithTag("Image2").GetComponent(Image).sprite = UIoil;break;
			case "water" : GameObject.FindWithTag("Image2").GetComponent(Image).sprite = UIwater;break;
		}
		GameObject.FindWithTag("Image2").GetComponent(Image).color.a = 255;
	}
	switch(finalElement)
	{
		case "fire" :  GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIfire;break;
		case "earth" : GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIearth;break;
		case "oil" :   GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIoil;break;
		case "dust" :  GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIdust;break;
		case "food" :  GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIfood;break;
		case "water" : GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIwater;break;
		case "bomb" :  GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UIbomb;break;
		case "mud" :   GameObject.FindWithTag("Image3").GetComponent(Image).sprite = UImud;break;
	}
	GameObject.FindWithTag("Image3").GetComponent(Image).color.a = 255;
	
	
}

function throwContent(element : String)
{
	sounds_playThrowContent(element);

	var prefab : Transform = null;
	switch(element)
	{
		case "fire" :  prefab = throwPrefabs[0]; break;
		case "earth" : prefab = throwPrefabs[1]; break;
		case "oil" :   prefab = throwPrefabs[2]; break;
		case "dust" :  prefab = throwPrefabs[3]; break;
		case "food" :  prefab = throwPrefabs[4]; break;
		case "water" : prefab = throwPrefabs[5]; break;
		case "bomb" :  prefab = throwPrefabs[6]; break;
		case "mud" :   prefab = throwPrefabs[7]; break;
	}
	
	var particle : Transform = Instantiate(prefab, transform.position, prefab.rotation);
	if(GetComponent(KnightMovement).facing == 1)
		particle.localEulerAngles.y += 180;
	particle.Translate(0,0,0.9);
	Destroy(particle.gameObject, 1.0);

	fill = 0;
	inside = ["none","none"];
	finalElement = "none";
	GameObject.FindWithTag("Image1").GetComponent(Image).sprite = null;
	GameObject.FindWithTag("Image2").GetComponent(Image).sprite = null;
	GameObject.FindWithTag("Image3").GetComponent(Image).sprite = null;
	GameObject.FindWithTag("Image1").GetComponent(Image).color.a = 0;
	GameObject.FindWithTag("Image2").GetComponent(Image).color.a = 0;
	GameObject.FindWithTag("Image3").GetComponent(Image).color.a = 0;
	defineGlow();
}

function OnTriggerEnter2D (collider : Collider2D)
{
	if(collider.gameObject.tag == "Element")
	{
		closeColor = collider.gameObject.GetComponentInChildren(Light).color;
		closeElement = collider.gameObject.name;
		defineGlow();
	}
}

function OnTriggerExit2D(other : Collider2D)
{
	graal.GetComponentInChildren(Light).range = 0;
	closeElement = "none";
	defineGlow();
}

function sounds_playGetItem(){
	soundPlayer = GameObject.FindWithTag("Knight").GetComponent(AudioSource);
	soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GetItemSFX");
	soundPlayer.volume = 0.4f;
	soundPlayer.Play();
}

function sounds_playThrowContent(element : String){
	soundPlayer = GameObject.FindWithTag("Knight").GetComponent(AudioSource);

	switch(element)
	{
		case "fire" :  soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalFireSFX"); break;
		case "earth" : soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalEarthSFX"); break;
		case "oil" :   soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalMudSFX"); break;
		case "dust" :  soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalDustSFX"); break;
		case "food" :  soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalFoodSFX"); break;
		case "water" : soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalWaterSFX"); break;
		case "bomb" :  soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalBombSFX"); break;
		case "mud" :   soundPlayer.clip = Resources.Load.<AudioClip>("Sounds/GraalMudSFX"); break;
	}

	soundPlayer.volume = 0.4f;
	soundPlayer.Play();
}