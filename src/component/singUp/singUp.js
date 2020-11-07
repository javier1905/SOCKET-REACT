import React, { useState, useEffect } from 'react'

import { singup } from '../../servicios/servicios'
import { muestraAlert } from '../../input/alert/alert'
import Menu from '../headerHome/headerHome'

import './singUp.scss'

const SingUp = () => {
	const [emailUsuario, setemailUsuario] = useState('')
	const [pwUsuario, setpwUsuario] = useState('')
	const [nombreUsuario, setnombreUsuario] = useState('')
	const [apellidoUsuario, setapellidoUsuario] = useState('')

	const abortController = new AbortController()

	const myChange = e => {
		const name = e.target.name
		const value = e.target.value
		if (name === 'emailUsuario') setemailUsuario(value)
		else if (name === 'pwUsuario') setpwUsuario(value)
		else if (name === 'nombreUsuario') setnombreUsuario(value)
		else setapellidoUsuario(value)
	}

	const callback = result => {
		if (result.opOK === true) muestraAlert('exito', result.mensaje)
		else muestraAlert('error', result.mensaje)
	}

	const mySubmit = e => {
		e.preventDefault()
		singup(emailUsuario, pwUsuario, nombreUsuario, apellidoUsuario, callback, abortController)
	}

	return (
		<>
			<Menu />
			<div className='container_singup'>
				<form onSubmit={mySubmit}>
					<label>
						Email
						<input name='emailUsuario' type='email' value={emailUsuario} onChange={myChange} />
					</label>
					<label>
						Password
						<input name='pwUsuario' type='password' value={pwUsuario} onChange={myChange} />
					</label>
					<label>
						Nombre
						<input name='nombreUsuario' type='text' value={nombreUsuario} onChange={myChange} />
					</label>
					<label>
						Apellido
						<input name='apellidoUsuario' type='text' value={apellidoUsuario} onChange={myChange} />
					</label>
					<button type='submit'>Registraste</button>
				</form>
			</div>
		</>
	)
}

export default SingUp
