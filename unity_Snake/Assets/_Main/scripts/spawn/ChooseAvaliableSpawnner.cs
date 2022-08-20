using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChooseAvaliableSpawnner : MonoBehaviour
{
    ChooseAvaliableSpawnner() 
    {
        SpawnLimit = 1;
        RetrySpawnDeley = 2;
        SpawnCheckDelay = 0;
    }
    public int RetrySpawnDeley { get; set; }
    public int SpawnLimit;
    private float SpawnCheckDelay;
    private int EnemyN() => GameObject.FindGameObjectsWithTag("Respawn").Length;
    private bool HasEnemy() => EnemyN() > 0;
    public PlayerController PlayerController;


    private void Update()
    {
        SpawnCheckDelay += Time.deltaTime;
        if (!PlayerController.IsAilve) SpawnCheckDelay = 0;

        if (SpawnCheckDelay > 2 && PlayerController.IsAilve) 
        {
            SpawnCheckDelay = 0;
            if(!HasEnemy()) ChooseChildAndSpawn();
        }
    }

    public void ChooseChildAndSpawn()
    {
        try
        {
            //Make a list to store avaliable Spawn blocks
            IList<Transform> avaliableChildren = new List<Transform>();
            //Loob the blocks
            foreach (Transform child in transform)
            {
                //Choose only blocks that has no collision
                if (!child.GetComponent<CollisionDetection>().IsColliding)
                {
                    avaliableChildren.Add(child);
                }
            }

            //If has no avaliable blocks, try again
            if (avaliableChildren.Count > 0)
            {
                //get an random block
                Transform theChild = avaliableChildren[UnityEngine.Random.Range(0, avaliableChildren.Count - 1)];

                //Check again for collision
                if (!theChild.GetComponent<CollisionDetection>().IsColliding)
                {
                    //check if the spawnned objects are less then the spawn limit
                    if (EnemyN() < SpawnLimit)
                    {
                        //call the spawn method
                        theChild.GetComponent<SpawnOverMyArea>().SpawnEnemy();
                        CancelInvoke("ChooseChildAndSpawn");
                    }
                    else 
                    {
                        CleanEnemies();
                        throw new Exception(string.Format("There is more enemies ({0}) then allowed in other to reapawn a new one, killing all and trying to respawn in {1} seconds", EnemyN(), RetrySpawnDeley));
                    }
                }
                else 
                { 
                    throw new Exception(string.Format("The Choosed SpawnArea got Collision after beeing choosed, retring to spawn in {0} seconds.", RetrySpawnDeley));
                }
            }
            else
            {
                throw new Exception(string.Format("There are no Children without collision, retring in {0} seconds.", RetrySpawnDeley));
            }
        }
        catch (System.Exception ex)
        {
            Debug.Log(ex);
            RetrytoSpawn();
        }

    }
    public void SpawnNext() 
    {
        RetrytoSpawn();
    }
    private void RetrytoSpawn() 
    {
        Invoke("ChooseChildAndSpawn", RetrySpawnDeley);
    }

    private void CleanEnemies() 
    {
        foreach(GameObject enemy in GameObject.FindGameObjectsWithTag("Respawn")) 
        {
            Destroy(enemy);
        }
    }
}
