using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    public PlayerController()
    {
        BodyParts = new List<Transform>();
        minDistance = 5f;
        speedFactor = 1;
        speedStart = 1;
        RotationSpeed = 150.0f;
        PlayerSize = 1;
        IsAilve = false;
    }

    public GameObject GameControllerObject;
    private GameController GameController;

    public List<Transform> BodyParts;
    public float minDistance;
    public float speedFactor;
    public float speedStart;

    public float ticks() => 0;
    public float CurrentSpeed() => speedStart + (speedFactor * BodyParts.Count) + (speedFactor * ticks());
    public float RotationSpeed { get; set; }
    public int PlayerSize;
    public GameObject bodyPrefab;

    public float PlayingTime { get; set; }
    public float distance { get; set; }
    public Transform currentBodyPart { get; set; }
    public Transform PrevBodyPart { get; set; }
    private bool _IsAilve { get; set; }
    public bool IsAilve
    {
        get
        {
            return _IsAilve;
        }
        set
        {
            try
            {
                if (GameController.AdIsPlaying)
                {
                    GameController.PauseScreen.SetActive(true);
                    _IsAilve = false;
                }
                else
                {
                    _IsAilve = value;
                }
            }
            catch (System.Exception)
            {
                _IsAilve = false;
            }
            
        }
    }
    public AudioClip DeathSound;
    public AudioClip WalkSound;
    private AudioSource HeadSoundSource { get; set; }

    private float clickDelay = 0.5f;
    private float clickT;


    void Start()
    {
        HeadSoundSource = GameObject.Find("HeadSoundController").GetComponent<AudioSource>();
        GameController = GameControllerObject.GetComponent<GameController>();
    }
    void Update()
    {
        clickT += Time.deltaTime;
        if (Input.GetKey(KeyCode.Escape)) InvertePause();
        if (IsAilve) Move();
    }

    public void InvertePause()
    {
        if (clickT > clickDelay)
        {
            GameController.PauseScreen.SetActive(IsAilve);
            IsAilve = !IsAilve;
            clickT = 0;
        }
    }

    public void StartLevel()
    {
        PlayingTime = 0;
        gameObject.GetComponent<AudioSource>().clip = WalkSound;
        gameObject.GetComponent<AudioSource>().Play();
        SetPlayerSizeToDefaults();
        BodyParts.FirstOrDefault().position = Vector3.zero;
        BodyParts.FirstOrDefault().rotation = Quaternion.identity;

        IsAilve = true;
    }

    public void EndLevel()
    {
        IsAilve = false;
        gameObject.GetComponent<AudioSource>().Stop();
        GameController.EndGame();
    }

    public void Die()
    {
        PlayingTime = 0;
        HeadSoundSource.PlayOneShot(DeathSound);
        DestroyPartsToOne();
        EndLevel();
    }

    public void SetPlayerSizeToDefaults()
    {
        if (BodyParts.Count > PlayerSize)
        {
            for (int i = BodyParts.Count - 1; i > BodyParts.Count; i--)
            {
                Transform part = BodyParts[i];
                Destroy(part.gameObject);
                BodyParts.Remove(part);
            }
        }
        else if (BodyParts.Count < PlayerSize)
        {
            for (int i = Mathf.Max(1, BodyParts.Count - 1); i < PlayerSize; i++)
            {
                AddBodyPart();
            }
        }
    }

    public void DestroyPartsToOne()
    {
        for (int i = BodyParts.Count - 1; i > 0; i--)
        {
            Transform part = BodyParts[i];
            Destroy(part.gameObject);
            BodyParts.Remove(part);
        }
    }

    public void DestroyOnePart()
    {
        if (BodyParts.Count > 1)
        {
            Transform part = BodyParts.Last();
            Destroy(part.gameObject);
            BodyParts.Remove(part);
        }
        else
        {
            Die();
        }
    }

    public void GetDamage()
    {
        DestroyOnePart();
        GameController.RemovePoints();
    }
    public void DoDamage()
    {
        AddBodyPart();
        GameController.AddPoints();
    }

    public void Move()
    {
        PlayingTime += Time.deltaTime;
        float currentSpeed = CurrentSpeed();

        Transform firstBodyPart = BodyParts.FirstOrDefault();
        firstBodyPart.Translate(firstBodyPart.forward * currentSpeed * Time.smoothDeltaTime, Space.World);

        Vector2 axis = new Vector2(GetInput.Axis(AxisEnum.Horizontal), GetInput.Axis(AxisEnum.Vertical));

        Vector3 rotateFactor = Vector3.up * RotationSpeed * Time.deltaTime;

        if (axis.x != 0 || Input.acceleration.x != 0)
        {
            if (axis.x != 0)
            {
                rotateFactor *= axis.x;
            }
            else
            {
                rotateFactor *= Input.acceleration.x;
            }
            firstBodyPart.Rotate(rotateFactor);
        }





        //firstBodyPart.Rotate(Vector3.up * rotationSpeed * Time.deltaTime * axis.x);


        for (int i = 1; i < BodyParts.Count; i++)
        {
            currentBodyPart = BodyParts[i];
            PrevBodyPart = BodyParts[i - 1];

            distance = Vector3.Distance(PrevBodyPart.position, currentBodyPart.position);

            Vector3 newPosition = PrevBodyPart.position;
            newPosition.y = firstBodyPart.position.y;

            float slerpTime = Mathf.Min(0.5f, Time.deltaTime * distance / minDistance * currentSpeed);

            currentBodyPart.position = Vector3.Slerp(currentBodyPart.position, newPosition, slerpTime);
            currentBodyPart.rotation = Quaternion.Slerp(currentBodyPart.rotation, PrevBodyPart.rotation, slerpTime);
        }

    }

    public void AddBodyPart()
    {
        Transform lastBodyPart = BodyParts[BodyParts.Count - 1];
        GameObject newBodyPartInstance = Instantiate(bodyPrefab, lastBodyPart.position, lastBodyPart.rotation);
        Transform newBodyPart = newBodyPartInstance.transform;
        newBodyPart.SetParent(transform);
        BodyParts.Add(newBodyPart);

    }
}
