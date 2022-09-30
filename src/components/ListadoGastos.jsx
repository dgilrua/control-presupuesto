import React from 'react'
import { Gasto } from './Gasto'
export const ListadoGastos = ({gastos, setGastoEditar, eliminarGasto, gastosFiltrados, filtro}) => {
  return (
    <div className='listado-gastos contenedor'>
        {
          filtro ? (
            <>
              <h2>{gastosFiltrados.length > 0 ? 'Gastos' : 'No Hay Gastos en esta categoria'}</h2>
              {gastosFiltrados.map(gasto => (
                  <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
              ))}
            </>
          ) : (
            <>
              <h2>{gastos.length > 0 ? 'Gastos' : 'No Hay Gastos aun'}</h2>
              {gastos.map(gasto => (
                  <Gasto gasto={gasto} key={gasto.id} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
              ))}
            </>
          ) 
        }
    </div>
  )
}
