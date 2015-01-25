#pragma strict

var graal:GameObject;
var closeElement:String;
var closeColor : Color;
var fill:int;
var inside:String[];
var throwPrefabs : Transform[];
var finalElement : String;


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
				pickUp(closeElement);
				finalElement = closeElement;
			}
			else if(fill == 1)
			{
				if((inside[0] == "fire" && closeElement == "oil") || (inside[0] == "oil" && closeElement == "fire"))
				{
					fill = 0;
					pickUp("bomb");
					finalElement = "bomb";	
				}
				else if((inside[0] == "water" && closeElement == "earth") || (inside[0] == "earth" && closeElement == "water"))
				{
					fill = 0;
					pickUp("mud");
					finalElement = "mud";
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
	finalElement = element;
}

function throwContent(element : String)
{
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