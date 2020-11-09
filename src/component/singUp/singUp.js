import React, { useState } from 'react'

import { singup } from '../../servicios/servicios'
import { muestraAlert } from '../../input/alert/alert'
import Menu from '../headerHome/headerHome'
import Loading from '../../input/loading/loading'
import { Redirect } from 'react-router-dom'

import './singUp.scss'

const SingUp = () => {
	const [emailUsuario, setemailUsuario] = useState('')
	const [pwUsuario, setpwUsuario] = useState('')
	const [nombreUsuario, setnombreUsuario] = useState('')
	const [apellidoUsuario, setapellidoUsuario] = useState('')
	const [pwUsuarioConfirmacion, setpwUsuarioConfirmacion] = useState('')
	const [redirec, setredirec] = useState(false)
	const [loaging, setloaging] = useState(false)

	const abortController = new AbortController()

	const myChange = e => {
		const name = e.target.name
		const value = e.target.value
		if (name === 'emailUsuario') setemailUsuario(value)
		else if (name === 'pwUsuario') setpwUsuario(value)
		else if (name === 'pwUsuarioConfirmacion') setpwUsuarioConfirmacion(value)
		else if (name === 'nombreUsuario') setnombreUsuario(value)
		else setapellidoUsuario(value)
	}

	const callback = result => {
		if (result.opOK === true) {
			muestraAlert('exito', result.mensaje)
			setemailUsuario('')
			setpwUsuario('')
			setnombreUsuario('')
			setapellidoUsuario('')
			setTimeout(() => setredirec(true), 2000)
		} else muestraAlert('error', result.mensaje)
		setloaging(false)
	}

	const mySubmit = e => {
		e.preventDefault()
		if (pwUsuario === pwUsuarioConfirmacion) {
			setloaging(true)
			singup(emailUsuario, pwUsuario, nombreUsuario, apellidoUsuario, callback, abortController)
		} else {
			muestraAlert('error', 'Contraseñas diferentes')
		}
	}

	return (
		<>
			<Menu />
			<div className='container_singup'>
				<form onSubmit={mySubmit}>
					<h3>Sing Up</h3>
					<label htmlFor='txt_emailUsuario'>Email</label>
					<input
						id='txt_emailUsuario'
						name='emailUsuario'
						type='email'
						required
						value={emailUsuario}
						onChange={myChange}
					/>
					<label htmlFor='txt_pwUsuario'>Password</label>
					<input
						id='txt_pwUsuario'
						name='pwUsuario'
						type='password'
						required
						value={pwUsuario}
						onChange={myChange}
					/>
					<label htmlFor='txt_pwUsuarioConfirmacion'>Password</label>
					<input
						id='txt_pwUsuarioConfirmacion'
						name='pwUsuarioConfirmacion'
						type='password'
						required
						value={pwUsuarioConfirmacion}
						onChange={myChange}
					/>
					<label htmlFor='txt_nombreUsuario'>Nombre</label>
					<input
						id='txt_nombreUsuario'
						name='nombreUsuario'
						type='text'
						required
						value={nombreUsuario}
						onChange={myChange}
					/>
					<label htmlFor='txt_apellidoUsuario'>Apellido</label>
					<input
						id='txt_apellidoUsuario'
						name='apellidoUsuario'
						type='text'
						required
						value={apellidoUsuario}
						onChange={myChange}
					/>
					<button type='submit'>Registraste</button>
				</form>
			</div>
			{loaging && <Loading />}
			{redirec && <Redirect to='/login' />}
		</>
	)
}

export default SingUp
