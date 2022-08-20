using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlaySoundOnDeath : MonoBehaviour
{
    public AudioSource AudioSource { get; set; }
    public AudioClip deathClip;

    void Start()
    {
        AudioSource = GameObject.Find("EnemySounds").GetComponent<AudioSource>();
    }

    private void OnDestroy()
    {
        if (AudioSource) 
        {
            AudioSource.clip = deathClip;
            AudioSource.PlayOneShot(deathClip);
        }
    }

}
