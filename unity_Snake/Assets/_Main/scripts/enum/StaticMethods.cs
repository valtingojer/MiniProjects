using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class GetInput 
{
    public static float Axis(AxisEnum direction) 
    {
        return Input.GetAxis(direction.ToString());
    }
}

public enum AxisEnum
{ 
    Horizontal,
    Vertical
}

public enum CameraModeEnum : byte
{
    SmartPhone = 0,
    VirtualReality = 1
}