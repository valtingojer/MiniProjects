using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class CopyText : MonoBehaviour
{
    public Text OriginalText;
    public Text CopiedText;
    private void OnEnable()
    {
        CopiedText.text = OriginalText.text;
    }
}
