using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChooseEnemy : MonoBehaviour
{
    public GameObject Bomb;
    void OnDisable()
    {
        DisableAllChildren();
    }

    void OnEnable()
    {
        SpawnChild();
    }

    public void SpawnChild() 
    {
        transform.GetChild(Random.Range(0, transform.childCount - 1)).gameObject.SetActive(true);
        if (Random.Range(0, 100) > Random.Range(50,90)) 
        {
            Invoke("SwichToBomb", Random.Range(0.1f, 5.0f));
        }
    }
    public void DisableAllChildren() 
    {
        foreach (Transform child in transform)
        {
            child.gameObject.SetActive(false);
        }
    }

    public void SwichToBomb() 
    {
        DisableAllChildren();
        Bomb.SetActive(true);
    }
}
