import React from 'react';

const criptomoneda = ({criptomoneda}) => 
{
    const { FullName, Name } = criptomoneda.CoinInfo;

    return (

        <option value={Name}> {FullName} </option>
    )
}
export default criptomoneda;

