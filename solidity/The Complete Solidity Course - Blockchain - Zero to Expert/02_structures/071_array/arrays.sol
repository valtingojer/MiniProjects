pragma solidity >= 0.7.0 < 0.9.0;

contract learnArrays{
    uint[] arrDM;
    uint[] arrDA;
    uint[] private arrTmp;
    uint[200] arrF;


    function AddItemsDM(uint number) public{
        arrDM.push(number);
    }

    function RemoveLastItemDM() public{
        arrDM.pop();
    }

    function GetArraySizeDM() public view returns(uint){
        return arrDM.length;
    }

    function RemoveByIndexDM(uint index) public {
        //delete arrDM[index]; //clean the content of index
        uint lastIndex = arrDM.length - 1;
        
        if(index > lastIndex){
            return;
        }else if(index == lastIndex){
            RemoveLastItemDM();
            return;
        }

        for(uint i = 0; i <= lastIndex; i++){
            if(i == index) continue;
            arrTmp.push(arrDM[i]);
        }
        arrDM = arrTmp;
    }

    function GetArrDM() public view returns(uint[] memory){
        return arrDM;
    }

}