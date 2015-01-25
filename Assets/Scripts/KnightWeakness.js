#pragma strict

function Start ()
{
}

function OnCollisionEnter2D(col : Collision2D)
{
	if(col.collider.CompareTag("Enemy"))
	{
		var force : Vector3 = (transform.position-col.collider.transform.position);
		rigidbody2D.AddForce(new Vector2(force.x, force.y).normalized * 20, ForceMode2D.Impulse);
		GetComponent(KnightMovement).enabled = false;
		Invoke("EnableMovement", 0.1);
	}
}

function EnableMovement()
{
	GetComponent(KnightMovement).enabled = true;
}