import React, { useState } from 'react'
import Cookie from 'universal-cookie'
import { Redirect } from 'react-router-dom'
import { login } from '../../servicios/servicios'
import { muestraAlert } from '../../input/alert/alert'
import Loading from '../../input/loading/loading'
import Menu from '../headerHome/headerHome'

import './login.scss'

const Login = () => {
	const [emailUsuario, setemailUsuario] = useState('')
	const [pwUsuario, setpwUsuario] = useState('')
	const [logOK, setlogOK] = useState(false)
	const [loading, setloading] = useState(false)

	const abortController = new AbortController()

	const change = e => {
		const name = e.target.name
		const value = e.target.value
		if (name === 'emailUsuario') setemailUsuario(value)
		else setpwUsuario(value)
	}

	const callback = result => {
		setloading(false)
		if (result.logOK) {
			const cookie = new Cookie()
			cookie.set('token', result.token, { path: '/' })
			setlogOK(true)
		} else muestraAlert('error', result.mensaje)
	}

	const submit = e => {
		e.preventDefault()
		setloading(true)
		login(emailUsuario, pwUsuario, abortController, callback)
	}
	return (
		<div>
			<Menu />
			<div className='container_login'>
				<form onSubmit={submit} className='form_login'>
					<h3>Sing In</h3>
					<label htmlFor='txt_emailUsuario'>Email</label>
					<input
						value={emailUsuario}
						onChange={change}
						name='emailUsuario'
						id='txt_emailUsuario'
						type='email'
						required
					/>
					<label htmlFor='txt_pwUsuario'>Password</label>
					<input
						value={pwUsuario}
						onChange={change}
						name='pwUsuario'
						id='txt_pwUsuario'
						type='password'
						required
					/>
					<button type='submit'>INICIAR SESION</button>
				</form>

				{logOK && <Redirect to='/app' />}

				{loading && <Loading />}
			</div>
		</div>
	)
}
export default Login
