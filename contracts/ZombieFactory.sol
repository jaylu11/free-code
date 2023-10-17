// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownable.sol";
import "./safemath.sol";

contract ZombieFactory is Ownable {
    using SafeMath for uint256;
    using SafeMath16 for uint16;
    using SafeMath32 for uint32;
    event Newzombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;
    string name;
    struct Zombie {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Zombie[] public zombies;
    mapping(uint => address) public zombieToOwner;
    mapping(address => uint) public ownerZombieCount;

    constructor() {}

    function _createZombie(string storage _name, uint _dna) internal {
        zombies.push(
            Zombie(_name, _dna, 1, uint32(block.timestamp + cooldownTime), 0, 0)
        );
        uint id = zombies.length - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender] = ownerZombieCount[msg.sender].add(1);
    }

    function generateRandomDna()
        public
        view
        returns (
            //should be private
            // string storage _str
            uint
        )
    {
        uint rand = uint(keccak256(abi.encode(name)));
        return rand % dnaModulus;
    }

    function fund() public payable {
        require(msg.value == 0);
    }

    function createRandomZombie(string memory _name) public {
        name = setName(_name);
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = generateRandomDna();
        _createZombie(name, randDna);

        // zombies.push(
        //     Zombie({
        //         name: name,
        //         dna: randDna,
        //         level: 1,
        //         readyTime: uint32(block.timestamp + cooldownTime),
        //         winCount: 0,
        //         lossCount: 0
        //     })
        // );
        //_createZombie(name,randDna);
    }

    function setName(string memory _name) public returns (string memory) {
        name = _name;
        return name;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}
