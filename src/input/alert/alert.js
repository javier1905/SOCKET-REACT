import React, { useRef, useEffect } from 'react'
import { render } from 'react-dom'
import './alert.css'

export const muestraAlert = (type, texto) => {
	if (document.getElementById('containrAlert')) {
		document.body.removeChild(document.getElementById('containrAlert'))
	}
	const div = document.createElement('div')
	div.setAttribute('id', 'containrAlert')
	document.body.appendChild(div)
	render(<Alert type={type} texto={texto} />, div)
}

const Alert = ({ type, texto }) => {
	const myAlert = useRef()

	useEffect(() => {
		var timeout = undefined
		var timeout2 = undefined
		timeout && clearTimeout(timeout)
		timeout2 && clearTimeout(timeout2)
		myAlert.current && myAlert.current.classList.remove('escondeAlert')

		timeout = setTimeout(() => {
			if (myAlert.current) {
				myAlert.current.classList.add('escondeAlert')
				timeout2 = setTimeout(() => {
					myAlert.current && myAlert.current.classList.remove('escondeAlert')
					document.getElementById('containrAlert') &&
						document.body.removeChild(document.getElementById('containrAlert'))
				}, 1000)
			}
		}, 2000)
	}, [])

	return (
		<div
			className='myAlert'
			ref={myAlert}
			style={{ background: type === 'error' ? '#C0392B' : '#52BE80' }}
		>
			<p> {texto}</p>
		</div>
	)
}

export default Alert
