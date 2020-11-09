import { useState, useEffect, useRef } from 'react'
import Contacto from '../contacto/contacto'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons'
import './contactos.css'

const Contactos = ({ vecContactos, abrirConvesacion }) => {
	const [vecContactoS, setvecContactoS] = useState([])
	const [buscarContacto, setbuscarContacto] = useState('')

	const container_contac = useRef()

	useEffect(() => setvecContactoS(vecContactos), [vecContactos])

	const buscarcontactos = e => setbuscarContacto(e.target.value)

	const toogle = e => {
		container_contac.current.classList.remove('showAnimacionToogle')
		container_contac.current.classList.remove('hideAnimacionToogle')

		const btn = document.querySelector('.btn_down svg')
		if (btn.style.transform === 'rotate(180deg)') {
			btn.style.transform = 'rotate(360deg)'
			container_contac.current.classList.add('showAnimacionToogle')
		} else if (btn.style.transform === 'rotate(360deg)') {
			container_contac.current.classList.add('hideAnimacionToogle')
			btn.style.transform = 'rotate(180deg)'
		} else {
			container_contac.current.classList.add('hideAnimacionToogle')
			btn.style.transform = 'rotate(180deg)'
		}
	}

	return (
		<div className='container_contactos'>
			<div className='cabesera_contactos'>
				<div className='container_imgContac'>
					<img
						src={'https://i.pinimg.com/474x/ed/7a/b1/ed7ab14dabada7f024e2a21640b02290.jpg'}
						alt='foto'
					></img>
					<div className='circulo_verde'> </div>
				</div>
				<p>Contactos</p>
				<div className='container_buttons' id='container_btn_down'>
					<button className='btn_down' onClick={toogle}>
						<FontAwesomeIcon icon={faAngleDown} />
					</button>
				</div>
			</div>
			<div ref={container_contac}>
				<div className='container_buscadot_contactos'>
					<input
						value={buscarContacto}
						type='text'
						className='txt_buscadorContactos'
						onChange={buscarcontactos}
						placeholder='Buscar contactos'
					></input>
					<div className='container_lupa'>
						<FontAwesomeIcon icon={faSearch} />
					</div>
				</div>
				<div className='container_listaContactos'>
					{Array.isArray(vecContactos) &&
						vecContactoS
							.filter(con => new RegExp(buscarContacto, 'g', 'i').test(con.usuario.emailUsuario))
							.map((c, i) => {
								return <Contacto abrirConvesacion={abrirConvesacion} contacto={c} key={i} />
							})}
				</div>
			</div>
		</div>
	)
}

export default Contactos
