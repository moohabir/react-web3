import React, { useState } from 'react';

function TokenInfo() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    TokenName: '',
    TokenSymbol: '',
    address: '',
    decimals: '',
    balance: '',
    amount: '',
  });
  const {
    TokenName,
    TokenSymbol,
    address,
    decimals,
    // balance,
    amount,
    totalSupply,
  } = formData;

  const TokenInfoHandler = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      TokenName: 'CamelToken',
      TokenSymbol: 'CMLT',
      address: 'ox23477dgg5678990hg7800ßhjiii89',
      decimals: '18',
      totalSupply: '100000000000000',
    });
    console.log({
      TokenName: 'CamelToken',
      TokenSymbol: 'CMLT',
      address: 'ox23477dgg5678990hg7800ßhjiii89',
      decimals: '18',
      totalSupply: '100000000000000',
    });
    setShow(!show);
  };
  return (
    <div
      style={{
        backgroundColor: 'blue',
        marginTop: '30pxpx',
        maxWidth: '50%',
        padding: '10px',
        margin: 'auto',
        color: '#fff',
        border: '1px, solid, gray',
        borderRadius: '10px',
      }}
    >
      <form onSubmit={TokenInfoHandler}>
        {show ? (
          <>
            <h2>Token Info</h2>
            <h4>Token name: {TokenName}</h4>
            <h4>Token symbol: {TokenSymbol}</h4>
            <h4>Decimals: {decimals}</h4>
            <h4>Total supply: {totalSupply}</h4>
          </>
        ) : (
          ''
        )}

        {show ? (
          <button>Hide CamelToken info</button>
        ) : (
          <button type="submit">Get CamelToken info</button>
        )}
      </form>
    </div>
  );
}

export default TokenInfo;
