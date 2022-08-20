using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class LookAt : MonoBehaviour
{
    public IList<GameObject> Enemy;
    private float delay = 0.3f;
    private float t = 0;

    void Update()
    {
        t += Time.deltaTime;
        if (t > delay)
        {
            try
            {
                gameObject.GetComponent<MeshRenderer>().enabled = true;
                gameObject.SetActive(true);
                transform.LookAt(Enemy.FirstOrDefault().transform);
            }
            catch (System.Exception)
            {
                gameObject.GetComponent<MeshRenderer>().enabled = false;
                Enemy = GameObject.FindGameObjectsWithTag("Respawn");
            }
            t = 0;
        }
        
        

    }
}
