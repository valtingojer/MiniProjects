using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RestartGameInSeconds : MonoBehaviour
{
    RestartGameInSeconds()
    {
        StartInSeconds = 5;
    }
    public GameController gameController;
    public int StartInSeconds;
    
    private void OnEnable()
    {
        Invoke("DoStartGame", StartInSeconds);
    }

    private void OnDisable()
    {
        CancelInvoke("DoStartGame");
    }

    public void DoStartGame() 
    {
        gameController.StartGame();
    }
}
