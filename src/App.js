import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';


function App() {

  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');
  const [ cargando, setCargando ] = useState(false);
  const [ resultado, setResultado] = useState({});

  useEffect( () => {
    const cotizarCriptomoneda = async () => 
    {

        if(moneda === '') return;

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        console.log(resultado.data.DISPLAY[criptomoneda][moneda]);

        //Mostrar Spinner
        setCargando(true);
        
        //Ocultar Spinner y mostrar resultado
        setTimeout(() => 
        {
          setCargando(false)
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        },3000);
    }

    cotizarCriptomoneda();
  }, [criptomoneda, moneda]);
  
  const componente2 = (cargando) ? <Spinner />: <Cotizacion resultado={resultado} />

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <img src={imagen} alt="imagen criptomonedas" className="logotipo" />
          </div>
          <div className="one-half column">
            <h1>Cotiza criptomonedas al instante</h1>
            <Formulario 
                setMoneda={setMoneda}
                setCriptomoneda={setCriptomoneda}
            />
            {componente2}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
