import { useState } from 'react'
import Chat from './component/chat/chat'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import setConnectionSocket from './redux/action/findConnectionSocket'
import setNombreUsuario from './redux/action/findNombreUsuario'
import './App.css'

const App = () => {
	const [nameUser, setnameUser] = useState('')
	const dispatch = useDispatch()
	const socket = useSelector(store => store.SocketConnection)

	const conectarChat = e => {
		dispatch(setConnectionSocket(io(process.env.REACT_APP_URL_API)))
		dispatch(setNombreUsuario(nameUser))
	}
	const desconectarChat = () => setConnectionSocket(undefined)

	return (
		<div className='App'>
			{socket === '' && (
				<div>
					<input type='text' value={nameUser} onChange={e => setnameUser(e.target.value)} />
					<button onClick={conectarChat}>CONECTARME</button>
				</div>
			)}
			{socket !== '' && <Chat desconectarChat={desconectarChat} />}
		</div>
	)
}

export default App
