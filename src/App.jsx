import { useEffect, useState } from "react"
import { Filtros } from "./components/Filtros"
import { Header } from "./components/Header"
import { ListadoGastos } from "./components/ListadoGastos"
import { Modal } from "./components/Modal"
import { generarId } from "./helpers"
import iconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

    const [presupuesto, setPresupuesto] = useState(
        Number(localStorage.getItem('presupuesto')) ?? 0
    )
    const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
    const [modal, setModal] = useState(false)
    const [animarModal, setAnimarModal] = useState(false)
    const [gastos, setGastos] = useState(
        localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )
    const [gastoEditar, setGastoEditar] = useState({})

    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0 ) {
            setModal(true)

            setTimeout(() => {
                setAnimarModal(true)
            }, 500)
        }
    }, [gastoEditar])

    useEffect(() => {
        if(filtro) {
            const gastoFiltrado = gastos.filter(gasto => gasto.categoria === filtro)
            setGastosFiltrados(gastoFiltrado)
        }
    }, [filtro])

    useEffect(() => {
        localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto])

    useEffect(() => {
        localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos])

    useEffect(() => {
        const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0
        if (presupuestoLS > 0) {
            setIsValidPresupuesto(true)
        }
    }, [])

    const handleNuevoGasto = () => {
        setModal(true)
        setGastoEditar({})

        setTimeout(() => {
            setAnimarModal(true)
        }, 500)
    }

    const guardarGasto = gasto => {

        if(gasto.id) {
            const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
            setGastos(gastosActualizados)
            setTimeout(() => {
                setGastoEditar({})
            }, 500);
        } else {
            gasto.id = generarId()
            gasto.fecha = Date.now()
            setGastos([...gastos, gasto])
        }
    }

    const eliminarGasto = id => {
        const nuevosGastos = gastos.filter(gasto => gasto.id !== id)
        setGastos(nuevosGastos)
    }

 return(
  <div className={modal ? 'fijar' : ''}>
    <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto} 
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
    />

    {isValidPresupuesto && (
        <>
            <main>
                <Filtros 
                    filtro={filtro}
                    setFiltro={setFiltro}
                />
                <ListadoGastos 
                    gastos={gastos} 
                    setGastoEditar={setGastoEditar} 
                    eliminarGasto={eliminarGasto}
                    gastosFiltrados={gastosFiltrados}
                    filtro={filtro}
                />
            </main>
            <div className="nuevo-gasto">
                <img 
                    src={iconoNuevoGasto}
                    alt="icono gasto" 
                    onClick={handleNuevoGasto}
                />
            </div>
        </>
    )}

    {modal && <Modal 
                setModal={setModal} 
                animarModal={animarModal} 
                setAnimarModal={setAnimarModal}
                guardarGasto={guardarGasto} 
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
              />}

  </div>
 )

}

export default App
