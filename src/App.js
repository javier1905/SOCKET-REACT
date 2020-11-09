import { useState, useEffect } from 'react'
import Chat from './component/chat/chat'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import setSocket from './redux/action/setSocket'
import setUsuario from './redux/action/setUsuario'

import { getUserLogin } from './servicios/servicios'
// import usuario from './redux/reducers/usuario'

import './App.css'

const App = () => {
	const [logOK, setlogOK] = useState(true)

	const dispatch = useDispatch()
	const socket = useSelector(store => store.socket)
	const usuario = useSelector(store => store.usuario)

	const abortController = new AbortController()

	const callback = result => {
		if (result.logOK === true) {
			console.log('====================================')
			console.log(result.usuario)
			console.log('====================================')
			dispatch(setSocket(io(process.env.REACT_APP_URL_API)))
			dispatch(setUsuario(result.usuario))
			setlogOK(true)
		} else setlogOK(false)
	}

	useEffect(() => getUserLogin(abortController, callback), [])

	const desconectarChat = () => dispatch(setSocket(''))

	return (
		<div className='App'>
			<div>
				<ul>
					<li>{usuario.emailUsuario}</li>
					<li>{usuario.nombreUsuario}</li>
					<li>{usuario.apellidoUsuario}</li>
				</ul>
			</div>
			{socket !== '' && <Chat desconectarChat={desconectarChat} />}
			{logOK === false && <Redirect to='/singin' />}
		</div>
	)
}

export default App
