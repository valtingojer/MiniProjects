using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

public class PlayerRoll : MonoBehaviour
{

    public PlayerRoll()
    {
        scrollSpeed = 1.0f;
        direction = new Vector2(1, 1);
    }
    public float scrollSpeed;
    public Vector2 direction;
    public bool HasRollEffect;
    public bool EnableOnMove;
    public bool EnableOnStop;
    private PlayerController PlayerController;
    private GameObject Player;
    public GameObject PlayerSkin;
    private new Renderer renderer;
    private Vector3 previousPosition;
    private float velocity;


    private void Start()
    {
        //renderer = GetComponent<Renderer>();
        Player = GameObject.Find("Player");
        PlayerController = Player.GetComponent<PlayerController>();
    }

    void Update()
    {
        VisibilityBySpeed();
        Roll();
    }

    private void VisibilityBySpeed() 
    {
        velocity = ((transform.position - previousPosition).magnitude) / Time.deltaTime;
        previousPosition = transform.position;
        var speed = velocity;

        //enable or disable object when stopped based on enable on stop
        if (EnableOnStop) 
        {
            if (speed == 0)
                PlayerSkin.SetActive(true);
            else
                PlayerSkin.SetActive(false);
        }

        //enable or disable object when stopped based on enable on move
        if (EnableOnMove)
        {
            if (speed != 0)
                PlayerSkin.SetActive(true);
            else
                PlayerSkin.SetActive(false);
        }
    }

    private void Roll()
    {
        if (!HasRollEffect) return;
        PlayerSkin.transform.Rotate(Vector3.forward, velocity * 30 * Time.deltaTime, Space.Self);
    }

}
