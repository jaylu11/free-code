/*
 * @Author: jaylu11 lushuyuan1@hotmail.com
 * @Date: 2023-10-22 13:16:19
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-22 13:19:38
 * @FilePath: /freecode/deploy/00-deploy-Kitty.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { deployments, getNamedAccounts, network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const verify = require("../utils/verify");

require("dotenv").config();

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  //await deploy("Ownable", { from: deployer, log: true });
  if (network.name == "localhost") {
    const kitty = await deploy("Kitty", {
      from: deployer,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
    });
  }
  log("-----------------------------");
};
module.exports.tags = ["all", "Kitty"];
