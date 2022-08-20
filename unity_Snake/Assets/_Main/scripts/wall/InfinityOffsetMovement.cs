using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class InfinityOffsetMovement : MonoBehaviour
{
    public InfinityOffsetMovement() 
    {
        scrollSpeed = 1.0f;
        direction = new Vector2(1, 1);
    }
    public float scrollSpeed;
    public Vector2 direction;
    public bool MoveOnlyIfPlayerIsAlive;
    private PlayerController PlayerController;
    private new Renderer renderer;

    private void Start()
    {
        renderer = GetComponent<Renderer>();
        PlayerController = GameObject.Find("Player").GetComponent<PlayerController>();
    }

    void Update()
    {
        if (MoveOnlyIfPlayerIsAlive && !PlayerController.IsAilve) return;
        float xoffset = direction.x != 0 ? Mathf.Abs(scrollSpeed * Time.smoothDeltaTime + Mathf.Abs(renderer.material.mainTextureOffset.x)) * direction.x : 0;
        float yoffset = direction.y != 0 ? Mathf.Abs(scrollSpeed * Time.smoothDeltaTime + Mathf.Abs(renderer.material.mainTextureOffset.y)) * direction.y : 0;
        renderer.material.mainTextureOffset = new Vector2(xoffset, yoffset);
    }
}
