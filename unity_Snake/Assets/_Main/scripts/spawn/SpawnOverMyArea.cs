using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnOverMyArea : MonoBehaviour
{
    public IList<Vector2> References { get; set; }
    public Vector3 RandonV3InsideMe() => new Vector3( Random.Range(transform.position.x - (transform.localScale.x / 2), transform.position.x + (transform.localScale.x / 2)), 0, Random.Range(transform.position.z - (transform.localScale.z / 2), transform.position.z + (transform.localScale.z / 2)));
    public GameObject Enemy;
    public PlayerController PlayerController;

    public void SpawnEnemy() 
    {
        if (PlayerController.IsAilve) 
        {
            var xpto = RandonV3InsideMe();
            var me = transform.position;
            Instantiate(Enemy, xpto, Quaternion.identity);
        }
    }
}
