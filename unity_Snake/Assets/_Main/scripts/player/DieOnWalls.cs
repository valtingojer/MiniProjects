using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DieOnWalls : MonoBehaviour
{
    private void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Wall"))
        {
            transform.parent.GetComponent<PlayerController>().Die();
        }
    }
}
