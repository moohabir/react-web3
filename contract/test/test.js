const CamelToken = artifacts.require('CamelToken');

contract('CamelToken', (accounts) => {
  it('should return the total supply of tokens', async () => {
    const instance = await CamelToken.deployed();
    const totalSupply = await instance.totalSupply();
    assert.equal(
      totalSupply.toNumber(),
      100000000000000,
      'The total supply is not correct'
    );
  });
});
