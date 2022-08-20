using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Advertisements;
using UnityEngine.UI;

public enum AdPlacementEnum : byte 
{
    StartGameAd = 0,
    Buff = 1,
    BannerAd = 2
}

public class MyUnityAdvertisementSnake : MonoBehaviour, IUnityAdsListener
{
    public PlayerController PlayerController;
    public GameController GameController;
    public string MyPlacement { get; set; }

    string gameId = "4037471";
    bool testMode = false;
    bool? wasAlive;

    private void Start()
    {
        Advertisement.AddListener(this);
        Advertisement.Initialize(gameId, testMode);
    }

    public void ShowAds(int AdPlacementNumber) 
    {
        AdPlacementEnum adPlacement = (AdPlacementEnum)AdPlacementNumber;
        MyPlacement = adPlacement.ToString();
       

        if (Advertisement.IsReady())
        {
            Advertisement.Show(MyPlacement);
        }
        else
        {
            Debug.Log("Interstitial ad not ready at the moment! Please try again later!");
        }
    }

    public void OnUnityAdsReady(string placementId)
    {
        Debug.Log("OnUnityAdsReady!");
        if (!GameController.FirstAdHasPlayed) 
        {
            GameController.FirstAdHasPlayed = true;
            ShowAds(0);
        }
    }

    public void OnUnityAdsDidError(string message)
    {
        ReenableAfterAd();
        Debug.Log("OnUnityAdsDidError!");
    }

    public void OnUnityAdsDidStart(string placementId)
    {
        GameController.AdIsPlaying = true;
        if (PlayerController.IsAilve == true) 
        {
            wasAlive = true;
            PlayerController.IsAilve = false;
            GameController.PauseScreen.SetActive(true);
        }
        else 
        {
            wasAlive = null;
        }
    }

    public void OnUnityAdsDidFinish(string placementId, ShowResult showResult)
    {
        GameController.AdIsPlaying = false;
        ReenableAfterAd();
        if (MyPlacement == AdPlacementEnum.Buff.ToString()) PlayerController.AddBodyPart();
    }

    public void ReenableAfterAd()
    {
        if (wasAlive.HasValue) 
        {
            if (wasAlive.Value && !PlayerController.IsAilve)
            {
                PlayerController.IsAilve = true;
                GameController.PauseScreen.SetActive(false);
            }
        }
    }
}
