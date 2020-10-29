import { useState, useEffect } from 'react'
import Conversacion from '../conversacion/conversacion'
import './conversaciones.css'

const Conversaciones = ({ vecConversaciones, posicion }) => {
	const [vecConversacioneS, setvecConversacioneS] = useState([])

	useEffect(() => {
		setvecConversacioneS(vecConversaciones)
	}, [vecConversaciones])

	return (
		<div
			style={{ right: posicion, width: vecConversacioneS.length * 260 - 10 }}
			id='container_conversaciones'
			className='container_conversaciones'
		>
			{vecConversacioneS.map((con, i) => {
				return (
					<Conversacion
						index={i}
						key={i}
						position={i === 0 ? i * 260 + 10 : i * 260 + 10}
						idSocketEmisor={con.idSocketEmisor}
						nombreEmisor={con.nombreEmisor}
						mensajeRecibido={con.mensajeRecibido}
					/>
				)
			})}
		</div>
	)
}

export default Conversaciones
