/*
 * @Author: jaylu11 lushuyuan1@hotmail.com
 * @Date: 2023-10-14 14:45:12
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-21 03:44:52
 * @FilePath: /freecode/deploy/01-deploy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { deployments, getNamedAccounts, network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const verify = require("../utils/verify");

require("dotenv").config();

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const kitty = await deploy("Kitty", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  const zombieFactory = await deploy("ZombieFactory", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  const zombieFeeding = await deploy("ZombieFeeding", {
    from: deployer,
    log: true,
    args: [kitty.address],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //await deploy("Ownable", { from: deployer, log: true });
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY &&
    network.name !== "ganache"
  ) {
    await verify(kitty.address, []);
  }
  log("-----------------------------");
};
module.exports.tags = ["all", "zombieFactory"];
