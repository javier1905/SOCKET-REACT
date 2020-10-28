import { useEffect, useState } from 'react'
import Chat from './component/chat/chat'
import io from 'socket.io-client'
import './App.css'

const App = () => {
	const [nameUser, setnameUser] = useState('')
	const [socket, setsocket] = useState(undefined)
	const conectarChat = e => setsocket(io(process.env.REACT_APP_URL_API))
	const desconectarChat = () => setsocket(undefined)

	return (
		<div className='App'>
			{socket === undefined && (
				<div>
					<input type='text' value={nameUser} onChange={e => setnameUser(e.target.value)} />
					<button onClick={conectarChat}>CONECTARME</button>
				</div>
			)}
			{socket && <Chat desconectarChat={desconectarChat} socket={socket} nameUser={nameUser} />}
		</div>
	)
}

export default App
