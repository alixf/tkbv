#pragma strict

var target : Transform;
private var offset : Vector3;

function Start ()
{
	offset = transform.position - target.position;
}

function Update ()
{
	transform.position = target.position + offset;
}