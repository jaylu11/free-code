// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ZombieFactory.sol";

interface KittyInterface {
    function getKitty(
        uint256 _id
    )
        external
        view
        returns (
            bool isGestating,
            bool isReady,
            uint256 cooldownIndex,
            uint256 nextActionAt,
            uint256 siringWithId,
            uint256 birthTime,
            uint256 matronId,
            uint256 sireId,
            uint256 generation,
            uint256 genes
        );
}

contract ZombieFeeding is ZombieFactory {
    //address ckAddress = 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9;
    KittyInterface kittyContract;

    constructor(address kittyAddress) {
        kittyContract = KittyInterface(kittyAddress);
    }

    function feedAndMultiply(
        uint _zombieId,
        uint _targetDna,
        string memory _species
    ) public {
        require(msg.sender == zombieToOwner[_zombieId]);
        Zombie storage myZombie = zombies[_zombieId];
        _targetDna = _targetDna % dnaModulus;
        uint newDna = (myZombie.dna + _targetDna) / 2;
        if (
            keccak256(abi.encodePacked("kitty")) ==
            keccak256(abi.encodePacked(_species))
        ) {
            newDna = newDna - (newDna % 100) + 99;
        }
        _createZombie("NoName", newDna);
    }

    function feedOnKitty(uint _zombieId, uint _kittyId) public {
        uint kittyDna;
        (, , , , , , , , , kittyDna) = kittyContract.getKitty(_kittyId);
        feedAndMultiply(_zombieId, kittyDna, "kitty");
    }

    function getKittyAddress() public view returns (KittyInterface) {
        return kittyContract;
    }
}
