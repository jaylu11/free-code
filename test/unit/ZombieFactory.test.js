/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-06 14:27:39
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-21 15:12:54
 * @FilePath: \free code\test\unit\ZombieFactory.test.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//test
const { deployments, ethers, getNamedAccounts, log } = require("hardhat");
const { expect, assert } = require("chai");

describe("ZombieFactory", async () => {
  let deployer;
  let name = "lu";
  let zombieFactory;
  const sendValue = 0;
  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    deployer = await ethers.getSigner(deployer); //same as connect
    const contracts = await deployments.fixture(["all"]);
    zombieFactory = await ethers.getContract("ZombieFactory", deployer);
    zombieFeeding = await ethers.getContract("ZombieFeeding", deployer);
    kitty = await ethers.getContract("Kitty", deployer);
    //zombieFactory = contracts["ZombieFactory"];
  });

  describe("Kitty", async () => {
    it("kittys end number with 99", async () => {
      for (i = 0; i < (await kitty.kittysLength()); i++) {
        d = await kitty.kittys(i);
        //d = await kitty.getKitty(1);
        //e = kittys.length;
        //console.log(String(d.genes));
        assert.equal(String(d.genes) % 100, String(99));
      }
    });
  });
  describe("ZombieFactory", async () => {
    it("create a zombie", async () => {
      let ownerAddress = deployer.address;
      count = await zombieFactory.ownerZombieCount(ownerAddress);
      assert.equal(count.toString(), "0");
      //console.log(count.toString());
      await zombieFactory.createRandomZombie(name);
      count = await zombieFactory.ownerZombieCount(ownerAddress);
      assert.equal(count.toString(), "1");
      const zombieAddress = await zombieFactory.zombieToOwner(0);
      assert.equal(zombieAddress, deployer.address);
      //console.log(count.toString());
      zombie = await zombieFactory.zombies(0);
      console.log(zombie.name);
      console.log(Number(zombie.dna));
      await expect(zombieFactory.createRandomZombie(name)).to.be.reverted;
    });
  });
  describe("ZombieFeeding", async () => {
    it("return kitty address", async () => {
      const response = await zombieFeeding.getKittyAddress();
      assert.equal(response, kitty.target);
    });
    it("common feed", async () => {
      let zombieId;
      let d = await kitty.kittys(0);
      await zombieFactory.createRandomZombie(name);
      console.log(await zombieFactory.zombieToOwner(0));
      console.log(deployer.address);
      console.log(await zombieFactory.zombiesLength());
      // const accounts = await ethers.getSigners();
      // const connectedFeeding = await zombieFeeding.connect(accounts[0]);
      for (i = 0; i < (await zombieFactory.zombiesLength()); i++) {
        if ((await zombieFactory.zombieToOwner(i)) == deployer.address) {
          zombieId = i;
        }
      }
      console.log(zombieId);
      await zombieFeeding.feedAndMultiply(
        zombieId,
        BigInt(d.genes),
        String("zombie")
      );
    });
  });
});
