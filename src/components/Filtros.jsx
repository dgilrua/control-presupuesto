import React from 'react'

export const Filtros = ({filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className="campo">
                <label htmlFor="Filtrar">Filtrar Gastos</label>
                <select 
                    value={filtro} 
                    id="Filtrar"
                    onChange={e => setFiltro(e.target.value)}
                >
                    <option value="" >Todos los gastos</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
  )
}
