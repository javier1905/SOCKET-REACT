import React from 'react'
import Conversacion from '../conversacion/conversacion'
import { useSelector } from 'react-redux'
import './conversaciones.css'

const Conversaciones = ({ posicion }) => {
	const vecCon = useSelector(state => state.vecConversaciones)

	return (
		<div
			style={{ right: posicion, width: vecCon.length * 260 - 10 }}
			id='container_conversaciones'
			className='container_conversaciones'
		>
			{vecCon.map((con, i) => {
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
