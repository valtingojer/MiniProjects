using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR;

public class GameController : MonoBehaviour
{
    GameController()
    {
        CameraMode = CameraModeEnum.SmartPhone;
        FirstAdHasPlayed = false;
    }
    public GameObject StartGameScreen;
    public GameObject DeathGameScreen;
    public GameObject PlayGameScreen;
    public GameObject PauseScreen;
    public GameObject Player;
    public GameObject GoogleVREmulator;
    public GameObject UnityAd;
    private PlayerController PlayerController { get; set; }
    private ScoreController ScoreController { get; set; }

    public CameraModeEnum CameraMode { get; set; }
    public bool FirstAdHasPlayed { get; set; }
    public bool AdIsPlaying { get; set; }

    private int SpeedMultiplayer () => Mathf.Max(2, Mathf.RoundToInt(PlayerController.CurrentSpeed()));
    private int PartsMultiplyer () => Mathf.Max(2, PlayerController.BodyParts.Count);
    private int TimeMultiplyer () => Mathf.RoundToInt(Mathf.Max(1, PlayerController.PlayingTime/60));
    private int CalculatedScore () => PartsMultiplyer() * SpeedMultiplayer() * TimeMultiplyer();

    private void Start()
    {
        PlayerController = Player.GetComponent<PlayerController>();
        ScoreController = gameObject.GetComponent<ScoreController>();
    }

    

    public void ExitGame()
    {
        Application.Quit();
    }

    public void SetCameraAndPlay(int mode) 
    {
        CameraMode = (CameraModeEnum)mode;

        switch (CameraMode)
        {
            case CameraModeEnum.SmartPhone:
                StartGame();
                break;
            case CameraModeEnum.VirtualReality:
                StartGameScreen.gameObject.SetActive(false);
                StartCoroutine(SwitchToVR());
                Invoke("StartGame", 15);
                break;
            default:
                break;
        }

    }

    // Call via `StartCoroutine(SwitchToVR())` from your code. Or, use
    // `yield SwitchToVR()` if calling from inside another coroutine.
    IEnumerator SwitchToVR()
    {
        // Device names are lowercase, as returned by `XRSettings.supportedDevices`.
        string desiredDevice = "cardboard"; // Or "daydream".

        // Some VR Devices do not support reloading when already active, see
        // https://docs.unity3d.com/ScriptReference/XR.XRSettings.LoadDeviceByName.html
        if (String.Compare(XRSettings.loadedDeviceName, desiredDevice, true) != 0)
        {
            XRSettings.LoadDeviceByName(desiredDevice);

            // Must wait one frame after calling `XRSettings.LoadDeviceByName()`.
            yield return null;
        }

        // Now it's ok to enable VR mode.
        XRSettings.enabled = true;
    }

    public void StartGame() 
    {
        ScoreController.ResetScore();
        DeathGameScreen.gameObject.SetActive(false);
        StartGameScreen.gameObject.SetActive(false);
        PlayerController.StartLevel();
        UnityAd.GetComponent<MyUnityAdvertisementSnake>().ShowAds(2);
    }
    public void EndGame() 
    {
        ScoreController.AutoSaveScore();
        DeathGameScreen.gameObject.SetActive(true);
        ScoreController.ResetScore();
        UnityAd.GetComponent<MyUnityAdvertisementSnake>().ShowAds(0);
    }



    public void AddPoints() 
    {
        ScoreController.AddScore(CalculatedScore()); 
    }
    public void RemovePoints() 
    {
        ScoreController.RemoveScore(CalculatedScore());
    }

    //public float TimeFromLastRetry;
    //public GameObject DeadScreen;
    //public Text scoreTxt;
    //public Text scoreDead;
    //public void SetScore(int s) => scoreTxt.text = string.Format("Score: {0}", s);
    //public int scoreValue() => BodyParts.Count - PlayerSize;


    //TimeFromLastRetry = Time.time;
    //DeadScreen.SetActive(false);
    //scoreTxt.gameObject.SetActive(true);

    //SetScore(0);

    //scoreDead.text = string.Format("Your score was: {0}", scoreValue());
    //scoreTxt.gameObject.SetActive(false);
    //DeadScreen.SetActive(true);

    //SetScore(scoreValue());

}
