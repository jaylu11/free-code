const { deployments, getNamedAccounts, network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const verify = require("../utils/verify");

require("dotenv").config();

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const zombieFeeding = await deploy("ZombieFeeding", {
    from: deployer,
    log: true,
    //args: [kitty.address],
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //await deploy("Ownable", { from: deployer, log: true });
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY &&
    network.name !== "ganache"
  ) {
    await verify(zombieFeeding.address, []);
  }
  log("-----------------------------");
};
module.exports.tags = ["all", "ZombieFeeding"];
