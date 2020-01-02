import React from 'react';

const Cotizacion = ({resultado}) =>
{
    if(Object.keys(resultado).length === 0) return null;

    return (
        <div className="resultado">
            <h2>Resultado</h2>
            <p className="precio"> El precio es: <span> {resultado.PRICE} </span></p>
            <p> El precio mas alto del dia: <span> {resultado.HIGHDAY} </span></p>
            <p> El precio mas bajo del dia: <span> {resultado.LOWDAY} </span></p>
            <p> Variación de las últimas 24 hrs: <span> {resultado.CHANGEPCT24HOUR}% </span></p>
            <p> Última actualización <span> {resultado.LASTUPDATE} </span></p>
        </div>
    );
}

export default Cotizacion;