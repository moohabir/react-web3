const CamelToken = artifacts.require('CamelToken');

module.exports = function (deployer) {
  deployer.deploy(CamelToken);
};
