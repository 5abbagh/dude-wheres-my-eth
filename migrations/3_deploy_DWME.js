// migrations/3_deploy_DWME.js
const DWME = artifacts.require("DudeWheresMyEth");

module.exports = async function (deployer) {
  await deployer.deploy(DWME);
};