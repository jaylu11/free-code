/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-10-06 14:27:39
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-17 14:37:02
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
    deployer = await ethers.getSigner(deployer);
    const contracts = await deployments.fixture(["all"]);
    zombieFactory = await ethers.getContract("ZombieFactory", deployer);
    //zombieFactory = contracts["ZombieFactory"];
  });

  describe("setNmae", async () => {
    it("set right name", async () => {
      //get an account to sign transaction
      const accounts = await ethers.getSigners();
      const connectZombie = await zombieFactory.connect(accounts[0]);
      //call functions
      const value = await connectZombie.setName(name);
      const response = await zombieFactory.getName();
      assert.equal(response, "lu");
      await zombieFactory.fund({ value: sendValue });
      const transaction = await zombieFactory.setName(name);
      await transaction.wait(1);
    });
  });
  describe("Zombie", async () => {
    it("if new", async () => {
      //get an account to sign transaction
      const accounts = await ethers.getSigners();
      const connectZombie = await zombieFactory.connect(accounts[0]);
      //call functions
      await connectZombie.setName(name);
      expect((zombieFactory.ownerZombieCount[accounts[1].address] = 0));
      //create a new zombie by deployer
      await connectZombie.createRandomZombie(name);
      assert.equal(deployer.address, accounts[0].address);
      assert.equal(await connectZombie.ownerZombieCount(accounts[0]), 1);
      for (i = 1; i < accounts.length; i++) {
        assert.equal(
          (await connectZombie.ownerZombieCount(accounts[i])) == 1,
          false
        );
      }
      for (i = 1; i < accounts.length; i++) {
        const zombie = await connectZombie.zombieToOwner(i);
        assert.equal(Number(zombie) == 0, true);
      }
      const zombie = await connectZombie.zombieToOwner(0);
      assert.equal(zombie, deployer.address);
    });
  });
});
