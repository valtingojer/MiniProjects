using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SelfDestroyDelayed : MonoBehaviour
{
    SelfDestroyDelayed()
    {
        doDamageIfTimeEnd = false;
        countOnlyIfAlive = true;
        destroySelf = true;
        CreateCounter = false;
        CounterLimit = 20;
        delay = 10;
        t = 0;
        tc = CounterLimit;
    }
    public float delay;
    public bool doDamageIfTimeEnd;
    public bool countOnlyIfAlive;
    public bool destroySelf;
    public bool destroyParent;
    public bool CreateCounter;
    public int CounterLimit;
    public Text TheCounter;

    private float t;
    private float tc;
    private PlayerController PlayerController;
    private void Start()
    {
        if (CreateCounter) 
        {
            TheCounter.text = CounterLimit.ToString();
            TheCounter.transform.parent.gameObject.SetActive(true);
        }
        PlayerController = GameObject.Find("Player").GetComponent<PlayerController>();
    }
    void Update()
    {
        if (countOnlyIfAlive && !PlayerController.IsAilve) return;

        DestroyCounting();
        if (CreateCounter) CounterCounting();
    }
    private void DestroyCounting() 
    {
        t += Time.deltaTime;
        if (t > delay)
        {
            if (doDamageIfTimeEnd)
            {
                PlayerController.GetDamage();
            }
            if (destroyParent)
            {
                gameObject.SetActive(false);
                Destroy(transform.parent.gameObject);
            }
            else if (destroySelf)
            {
                Destroy(gameObject);
            }
        }
    }
    private void CounterCounting() 
    {
        TheCounter.text = System.Math.Floor(tc).ToString();
        tc -= Time.deltaTime;
    }
}
