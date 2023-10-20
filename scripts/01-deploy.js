/*
 * @Author: jaylu11 lushuyuan1@hotmail.com
 * @Date: 2023-10-20 15:34:14
 * @LastEditors: jaylu11 lushuyuan1@hotmail.com
 * @LastEditTime: 2023-10-20 15:34:50
 * @FilePath: /freecode/scripts/01-deploy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { deployments, getNamedAccounts, network } = require("hardhat");

require("dotenv").config();

module.exports = async () => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const zombieFactory = await deploy("Kitty", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
};
