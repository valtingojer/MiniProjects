using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ScoreController : MonoBehaviour
{
    private const string HIGH_SCORE_STRING = "HighScore";
    public Text GameScoreText;
    public Text OverallScoreText;

    private int Score { get; set; }
    private int HighScore { get; set; }

    public int GetGameScore() => int.Parse(GameScoreText.text);
    public int GetOverallScore() => int.Parse(GameScoreText.text);
    public void AutoSaveScore() => SaveScore(GetGameScore());
    public void UpdateHighScore() => HighScore = PlayerPrefs.GetInt(HIGH_SCORE_STRING);

    private int delay = 5;

    private void Start()
    {
        InvokeRepeating("UpdateHighScore", 0, delay);
        InvokeRepeating("AutoSaveScore", delay, delay);
        InvokeRepeating("UpdateUiHighScore", 0.5f, delay);
    }
    private void Update()
    {
        
    }
    public void AddScore(int points) 
    {
        Score += points;
        UpdateUiScore();
        SaveScore(Score);
    }
    public void RemoveScore(int points)
    {
        Score -= points;
        Score = Mathf.Max(0, Score);
        UpdateUiScore();
    }
    public void ResetScore() 
    {
        Score = 0;
        UpdateUiScore();
    }
    public void SaveScore(int points)
    {
        if (HighScore < points) 
        {
            PlayerPrefs.SetInt(HIGH_SCORE_STRING, points);
            HighScore = points;
            UpdateHighScore();
            UpdateUiHighScore();
        }
    }

    public void UpdateUiHighScore() 
    {
        OverallScoreText.text = HighScore.ToString();
    }
    public void UpdateUiScore() 
    {
        GameScoreText.text = Score.ToString();
    }
    

    

}
