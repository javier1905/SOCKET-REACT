import { useEffect, useState } from 'react'
import Contactos from '../contactos/contactos'
import Conversaciones from '../conversaciones/conversaciones'
import addConversacion from '../../redux/action/findVecConversaciones'
import updateConversacion from '../../redux/action/conversacionUpdate'
// import findConeccionSocket from '../../redux/action/findConnectionSocket'
// import { connect } from 'react-redux'
import { useSelector, useDispatch } from 'react-redux'

import './chat.css'

const Chat = ({ desconectarChat }) => {
	const [vecContactos, setvecContactos] = useState([])
	const [myIdConexion, setmyIdConexion] = useState('')
	const [newConversacion, setnewConversacion] = useState({
		idSocketEmisor: '',
		nombreEmisor: '',
		mensajeRecibido: '',
	})
	const [posicion, setposicion] = useState(250)
	const socket = useSelector(state => state.SocketConnection)
	const nameUser = useSelector(state => state.NombreUsuario)
	var vecConversaciones = useSelector(state => state.vecConversaciones)
	const dispatch = useDispatch()

	useEffect(() => {
		socket.emit('sendUserConected', nameUser)

		socket.on('updateConect', vecConect => setvecContactos(vecConect))

		socket.on('resibirMsj:node-react', datos => {
			setnewConversacion({
				idSocketEmisor: datos.idSocketEmisor,
				nombreEmisor: datos.nombreEmisor,
				mensajeRecibido: datos.mensajeRecibido,
			})
		})
	}, [])

	useEffect(() => {
		if (
			vecConversaciones.find(c => c.idSocketEmisor === newConversacion.idSocketEmisor) === undefined
		) {
			newConversacion.idSocketEmisor !== '' && dispatch(addConversacion(newConversacion))
		} else {
			newConversacion.idSocketEmisor !== '' && dispatch(updateConversacion(newConversacion))
		}
	}, [newConversacion])
	useEffect(() => setmyIdConexion(socket.id), [socket])

	const abrirConvesacion = ({ idSocketEmisor, nombreEmisor, mensajeRecibido }) => {
		setposicion(260)
		vecConversaciones.find(c => c.idSocketEmisor === idSocketEmisor) === undefined &&
			dispatch(
				addConversacion({
					idSocketEmisor: idSocketEmisor,
					nombreEmisor: nombreEmisor,
					mensajeRecibido: mensajeRecibido,
				})
			)
	}

	const mueveIZquierda = e => posicion < 250 && setposicion(p => p + 250)

	const mueveIDerecha = e => {
		document.querySelector('#container_conversaciones').offsetLeft + 250 < 250 &&
			setposicion(p => p - 250)
	}

	return (
		<div className='App'>
			<div>
				<h1>{nameUser}</h1>
			</div>
			<Contactos
				vecContactos={vecContactos.filter(cc => cc.nombreUsuario !== nameUser)}
				abrirConvesacion={abrirConvesacion}
			/>
			<Conversaciones posicion={posicion} />
			<div className='container_slider'>
				<button onClick={mueveIZquierda}>{'<'}</button>
				<button onClick={mueveIDerecha}>{'>'} </button>
			</div>
			<button
				onClick={e => {
					socket.disconnect()
					desconectarChat()
				}}
			>
				DESCONECTAR DEL CHAT
			</button>
		</div>
	)
}

export default Chat

//TODO: REDUX USANDO HOC => -----------------

// export default connect(
// 	store => {
// 		socket: store
// 	},
// 	{
// 		setConecctionSocket: findConeccionSocket,
// 	}
// )(Chat)
