import { useState, useEffect } from 'react'
import Conversacion from '../conversacion/conversacion'
import './conversaciones.css'

const Conversaciones = ({ vecConversaciones, posicion }) => {
	const [vecConversacioneS, setvecConversacioneS] = useState([])

	useEffect(() => {
		setvecConversacioneS(vecConversaciones)
	}, [vecConversaciones])

	// const posiciona = () => {
	// 	const divsConversacion = document.querySelectorAll('container_conversacion')
	// 	if(divsConversacion[0]))
	// 	const AnchoConversacion = divsConversacion[0].clientWidth

	// }
	return (
		<div
			style={{ left: posicion }}
			id='container_conversaciones'
			className='container_conversaciones'
		>
			{vecConversacioneS.map((con, i) => {
				return <Conversacion position={i * 260 + 10} index={i} conversacion={con} key={i} />
			})}
		</div>
	)
}

export default Conversaciones
