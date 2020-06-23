pragma solidity ^0.5.0;

contract overledgerSCTestArrayFixedSize {

    uint16[] testUintArrayFixed;

    /// Create a new smart contract and initialise the test variables
    constructor(uint16[4] memory thisTestUintArrayFixed) public {
        testUintArrayFixed = thisTestUintArrayFixed;
    }

    function setOVLTestUintArrayFixed(uint16[4] calldata newTestUintArrayFixed) external {
        testUintArrayFixed = newTestUintArrayFixed;
    }

    
    function getTestUintArrayFixed(uint index) external view returns(uint16){
        return testUintArrayFixed[index];
    }
  
}