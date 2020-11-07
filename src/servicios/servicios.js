import Cookie from 'universal-cookie'

export const login = (emailUsuario, pwUsuario, abortController, callback) => {
	var cont = 0
	var contDOS = 0
	const myFetch = () => {
		fetch(`${process.env.REACT_APP_URL_API}/login`, {
			method: 'POST',
			body: JSON.stringify({ emailUsuario, pwUsuario }),
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}),
			signal: abortController.signal,
		})
			.then(d => d.json())
			.then(j => {
				if (j.opOK === true) callback(j)
				else if (j.opOK === false) {
					contDOS++
					contDOS < 2 ? myFetch() : callback(j)
				}
			})
			.catch(e => {
				if (e.name === 'AbortError') abortController.abort()
				else {
					cont++
					cont < 4 ? myFetch() : callback({ opOK: false, mensaje: e.message })
				}
			})
	}
	myFetch()
}

export const getUserLogin = (abortController, callback) => {
	var cont = 0
	var contDOS = 0
	const token = new Cookie().get('token')
	const myFetch = () => {
		fetch(`${process.env.REACT_APP_URL_API}/getuserlogin`, {
			method: 'GET',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			}),
			signal: abortController.signal,
		})
			.then(d => d.json())
			.then(j => {
				if (j.logOK === true) callback(j)
				else if (j.logOK === false) {
					contDOS++
					contDOS < 2 ? myFetch() : callback(j)
				}
			})
			.catch(e => {
				if (e.name === 'AbortError') abortController.abort()
				else {
					cont++
					cont < 4 ? myFetch() : callback({ logOK: false, mensaje: e.message })
				}
			})
	}
	myFetch()
}

export const singup = (
	emailUsuario,
	pwUsuario,
	nombreUsuario,
	apellidoUsuario,
	callback,
	abortController
) => {
	var cont = 0

	const myFetch = async () => {
		fetch(`${process.env.REACT_APP_URL_API}/api/usuario/singup`, {
			method: 'POST',
			body: JSON.stringify({ emailUsuario, pwUsuario, nombreUsuario, apellidoUsuario }),
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}),
			signal: abortController.signal,
		})
			.then(d => d.json())
			.then(j => callback(j))
			.catch(e => {
				if (e === 'AbortError') abortController.abort()
				else {
					cont++
					cont < 2 ? myFetch() : callback({ opOK: false, mensaje: e.message })
				}
			})
	}
	myFetch()
}
