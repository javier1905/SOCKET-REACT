import { useState, useEffect } from 'react'
import Contacto from '../contacto/contacto'
import './contactos.css'

const Contactos = ({ vecContactos, socket, abrirConvesacion }) => {
	const [vecContactoS, setvecContactoS] = useState([])
	useEffect(() => {
		setvecContactoS(vecContactos)
	}, [vecContactos])

	return (
		<div className='container_contactos'>
			<div className='cabesera_contactos'>
				<div className='container_imgContac'>
					<img
						src={'https://i.pinimg.com/474x/ed/7a/b1/ed7ab14dabada7f024e2a21640b02290.jpg'}
						alt='foto'
					></img>
				</div>
				<p>Contactos</p>
				<div className='circulo_verde'> </div>
			</div>
			<div className='container_listaContactos'>
				{Array.isArray(vecContactos) &&
					vecContactoS.map((c, i) => {
						return (
							<Contacto socket={socket} abrirConvesacion={abrirConvesacion} contacto={c} key={i} />
						)
					})}
			</div>
		</div>
	)
}

export default Contactos
