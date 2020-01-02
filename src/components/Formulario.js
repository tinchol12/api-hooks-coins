import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error';


function Formulario({setMoneda, setCriptomoneda})
{
        const [ criptomonedas, setCriptomonedas] = useState([]);
        const [ monedaCotizar, setMonedaCotizar] = useState('');
        const [ criptoCotizar, setCriptoCotizar] = useState('');
        const [ error, setError ] = useState(false);


        useEffect(() => 
        {
            const consultarAPI = async () => 
            {
                const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?imit=10&tsym=USD';

                const resultado = await axios.get(url);
               setCriptomonedas(resultado.data.Data);
            }

            consultarAPI();
        }, []);

        //VALIDAR Q LOS DOS CAMPOS ESTEN SELECCIONADOS
        const cotizarMoneda = e =>
        {
            e.preventDefault();
            //Validacion:
            if(monedaCotizar === '' || criptoCotizar === '')
            {
                setError(true);
                return;
            }
                setError(false);
                setMoneda(monedaCotizar);
                setCriptomoneda(criptoCotizar);
        }

        //Mostrar el error en caso de que exista

        const componente = (error) ? <Error mensaje="Ambos campos son obligatorios" /> : null;

        return (
            <form
                onSubmit={cotizarMoneda}
            >
                {componente}
                <div className="row">
                    <label> Elige tu Moneda</label>
                    <select 
                        className="u-full-width"
                        onChange={e => setMonedaCotizar(e.target.value)}
                    >
                        <option value="">-Elige tu moneda</option>
                        <option value="ARS">-Pesos Argentinos</option>
                        <option value="USD">-Dólares</option>
                        <option value="EUR">-Euro</option>

                    </select>
                </div>

                <div className="row">
                    <label>Elige tu Criptomoneda</label>
                    <select 
                            className="u-full-width"
                            onChange={e => setCriptoCotizar(e.target.value)}
                    >
                            <option value="">-Elige tu criptomoneda -></option>
                            {criptomonedas.map(criptomoneda => (
                                <Criptomoneda
                                    key={criptomoneda.CoinInfo.Id}
                                    criptomoneda={criptomoneda}
                                />

                            ))}
                    </select>
                </div>

                <input type="submit" className="button-primary u-full-width" value="Calcular"></input>

            </form>
        )
}
export default Formulario;