const { deployments, getNamedAccounts, network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const verify = require("../utils/verify");

require("dotenv").config();

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const zombieFactory = await deploy("ZombieFactory", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  //await deploy("Ownable", { from: deployer, log: true });
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY &&
    network.name !== "ganache"
  ) {
    await verify(zombieFactory.address, []);
  }
  log("-----------------------------");
};
module.exports.tags = ["all", "zombieFactory"];
