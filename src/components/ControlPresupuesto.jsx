import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import swal from 'sweetalert'

export const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0) 
        const nuevoPorcentaje = (((presupuesto - presupuesto + totalGastado)/presupuesto) * 100).toFixed(2)
        
        setDisponible(presupuesto - totalGastado)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 400);
    }, [gastos])

    const formatearCantidad = cantidad => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        swal({
            title: 'Reiniciar App', 
            text: '¿Deseas reiniciar los presupuestos y gastos?',
            icon: 'warning',
            buttons: ['No', 'Si']
        }).then(respuesta => {
            if (respuesta) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
                swal({text: 'La app se ha reiniciado con exito',
            icon: 'success', timer:'1000'})
            }
        })
        
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                })}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <button className='reset-app' type='button' onClick={handleResetApp}>Resetear App</button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''} `}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}
