pragma solidity ^0.4.19;
pragma experimental ABIEncoderV2;

import "./ownable.sol";
import "./safemath.sol";

// @title defining a contract to create an audit
// @author Yesh Singh
// @dev the contract is made with the assumption that a 
//  FI will make it for a third party

contract auditChain is Ownable{

	// using SafeMath to avoid OverFlows and UnderFlows
	using SafeMath for uint256;

	// defing an Audit srtucture, the implementation now uses UNIX time, but we can
	// convert this unix time to Gregorian date and time.

	struct Audit {
		address originatingId;
		address thirdPartyId;
		uint256 auditRating;
		uint256 timeReported;
		string typeOfAudit;
	}

	// Defining the amount of ether to use and a global count of number of Blocks on the
	// blockchain

	uint accessFee = 0.0001 ether;
	uint auditCount;


	// defining a list of Audits for the BlockChain
	Audit[] public audits;

	// defining mappings for the audits
	mapping (uint => address) public auditOfVendor;
	mapping (uint => address) public auditToOwner;
	mapping (address => string) public NameOfActor;
	mapping (address => string) public typeOfActor;
	mapping (address => uint) public vendorAuditCount;

	modifier auditAccess(uint _auditId) { 
		require (keccak256(typeOfActor[msg.sender]) == keccak256("Financial Institution") || auditOfVendor[_auditId] == msg.sender); 
		_; 
	}
	// @dev Working
	function declareType(string _type) external {
		typeOfActor[msg.sender] = _type;
	}
	
	// @dev Working
	function declareName(string _name) external {
	    NameOfActor[msg.sender] = _name;
	}
	
	// @dev Working
	function sayMyName() external view returns (string) {
	    return (NameOfActor[msg.sender]);
	}
	
	// @dev Working
	function accessType() external view returns (string) {
	    return (typeOfActor[msg.sender]);
	}
	
	// @dev Working
	function createAudit(address _thirdPartyId, uint _auditRating, string _type) external {
		require (keccak256(typeOfActor[msg.sender]) == keccak256("Financial Institution") && _thirdPartyId != msg.sender);
		uint id = audits.push(Audit(msg.sender, _thirdPartyId, _auditRating, now, _type))-1;
		auditToOwner[id] = msg.sender;
		auditOfVendor[id] = _thirdPartyId;
		// typeOfActor[msg.sender] = "Financial Institution";
		typeOfActor[_thirdPartyId] = "Third Party Vendor";
		vendorAuditCount[_thirdPartyId] = vendorAuditCount[_thirdPartyId].add(1);
	    auditCount = auditCount.add(1);
	    
	}

	// @dev Working but the payable function is taking too much GAS.
	function setAccessFee(uint _fee) external onlyOwner {
    	accessFee = _fee;
  	}
  	
  	// @dev Working, returns an array with ids of audits you're looking for
  	
  	function getAllTheAuditIds(address _address) external view returns (uint[]) {
  		uint256[] memory auditsOfVendor = new uint256[](auditCount);
  		for (uint i = 0; i < auditCount; i++) {
  			if (audits[i].thirdPartyId == _address) { 
  				auditsOfVendor[i] = 1;
  			}
  		}
  		return auditsOfVendor;
  	}
  	
  	// @dev Working, but the current versions do not support return of a struct
  	function getAllAudits(address _address) external view returns (Audit[]){
    	//uint256[] memory auditsOfVendor = new uint256[](auditCount);
  		Audit[] memory auditList = new Audit[](auditCount);
  		for (uint i = 0; i < auditCount; i++) {
  			if (audits[i].thirdPartyId == _address) { 
  				auditList[i] = audits[i];
  			}
  		}
  		return auditList;
  	}
  	
  	// @dev returns the number of Blocks on the BlockChain
  	function getAuditCount() external view returns (uint) {
  	    return auditCount;
  	}

  	// @dev returns the audit of a particular ID
	function accessAudit(uint _auditId) external view auditAccess(_auditId) returns (address, address, uint256, uint256, string) {
    	//require(msg.value == accessFee);
    	return (audits[_auditId].originatingId, audits[_auditId].thirdPartyId, audits[_auditId].auditRating, audits[_auditId].timeReported, audits[_auditId].typeOfAudit);
  	}
}