// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Kitty {
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    struct Kittys {
        bool isGestating;
        bool isReady;
        uint256 cooldownIndex;
        uint256 nextActionAt;
        uint256 siringWithId;
        uint256 birthTime;
        uint256 matronId;
        uint256 sireId;
        uint256 generation;
        uint256 genes;
    }
    Kittys[] public kittys;

    constructor() {
        uint g;
        uint fixedLength;
        for (uint i = 0; i < 10; i++) {
            g = block.timestamp;
            uint dna = uint(keccak256(abi.encode(g)));
            fixedLength = dna % dnaModulus;
            kittys.push(
                Kittys(
                    true,
                    true,
                    99,
                    99,
                    99,
                    99,
                    99,
                    99,
                    99,
                    fixedLength - (fixedLength % 100) + 99
                )
            );
        }
    }

    function kittysLength() public view returns (uint) {
        return kittys.length;
    }

    function getKitty(
        uint id
    )
        public
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
        )
    {
        Kittys storage kitty = kittys[id];
        return (
            kitty.isGestating,
            kitty.isReady,
            kitty.cooldownIndex,
            kitty.nextActionAt,
            kitty.siringWithId,
            kitty.birthTime,
            kitty.matronId,
            kitty.sireId,
            kitty.generation,
            kitty.genes
        );
    }
}
