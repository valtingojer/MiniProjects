using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CollisionDetection : MonoBehaviour
{
    const int layerAsset = 9;
    public CollisionDetection() 
    {
        IsColliding = false;
    }
    public bool IsColliding { get; set; }

    void OnTriggerStay(Collider other)
    {
        if (other.gameObject.layer == layerAsset) return;

        IsColliding = true;
    }
    void OnTriggerExit(Collider other)
    {
        IsColliding = false;
    }
}
