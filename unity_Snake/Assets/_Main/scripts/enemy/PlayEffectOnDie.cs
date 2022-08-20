using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayEffectOnDie : MonoBehaviour
{
    public GameObject Effect;
    void OnDestroy()
    {
        Instantiate(Effect, transform.position, transform.rotation);
    }

}
