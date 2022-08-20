using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class KillEnemyAndRespawNext : MonoBehaviour
{
    public GameObject Spawnner;
    public GameController GameController;

    private void Start()
    {
        Spawnner.GetComponent<ChooseAvaliableSpawnner>().SpawnNext();
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Respawn") || other.gameObject.name == "Bomb")
        {
            gameObject.GetComponent<AudioSource>().PlayOneShot(gameObject.GetComponent<AudioSource>().clip);
            Destroy(other.gameObject);
            Spawnner.GetComponent<ChooseAvaliableSpawnner>().SpawnNext();

            if (other.CompareTag("Respawn")) transform.parent.GetComponent<PlayerController>().DoDamage();

        }
    }
}
