import { useState, useEffect } from 'react'
import './contacto.css'

const Contacto = ({ socket, contacto, abrirConvesacion }) => {
	const [ContactO, setContactO] = useState({ idConexion: '', nombreUsuario: '' })

	useEffect(() => {
		setContactO(contacto)
	}, [contacto])

	const openChat = e => {
		abrirConvesacion({
			idSocketEmisor: ContactO.idConexion,
			nombreEmisor: ContactO.nombreUsuario,
			mensajeRecibido: '',
		})
	}

	return (
		<div className='container_contacto'>
			<button onClick={openChat}>
				<div className='container_imgCon'>
					<img
						src={`https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG`}
						alt='messi'
					></img>
				</div>
				<p>{ContactO.nombreUsuario}</p>
			</button>
		</div>
	)
}

export default Contacto
