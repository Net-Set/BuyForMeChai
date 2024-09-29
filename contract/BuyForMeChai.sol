// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.27;

contract BuyChainDapp{

    //inisilizetion struct in fields
    struct Memo{
        string name;
        string message;
        uint timestemp;
        address from;
    }

    Memo[] memos;
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }
    function buychai( string  calldata name, string calldata message) external payable{
        require(msg.value > 0 ,"please pay more then 0.");
        owner.transfer(msg.value);
        memos.push(Memo(name,message,block.timestamp,msg.sender));

    }
    function getMemos() public view returns(Memo[] memory){
        return memos;
    }


}