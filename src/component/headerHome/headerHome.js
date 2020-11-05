import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import './headerHome.scss'

const HeaderHome = () => {
	const history = useHistory()

	const subMenuMobile = useRef()

	const despliegaMenu = e => {
		subMenuMobile.current.classList.value.split(' ').forEach(clas => {
			if (clas === 'showSubmenu') {
				subMenuMobile.current.classList.remove('showSubmenu')
				subMenuMobile.current.classList.add('hideSubmenu')
				return
			} else if (clas === 'hideSubmenu') {
				subMenuMobile.current.classList.remove('hideSubmenu')
				subMenuMobile.current.classList.add('showSubmenu')
				return
			} else {
				subMenuMobile.current.classList.add('showSubmenu')
			}
		})
	}

	return (
		<div className='container_headerHome'>
			<div className='container_tiruloHeader'>
				<h2>HeaderHome</h2>
			</div>
			<div className='container_btn_sing_mobile'>
				<button onClick={despliegaMenu} id='btn_despliegaMenu'>
					<FontAwesomeIcon icon={faBars} />
				</button>
				<div className='subMeni_mobile' ref={subMenuMobile}>
					<button onClick={e => history.push('/login')} id='btn_singIn_mobile'>
						Sing In
					</button>
					<button onClick={e => history.push('/singup')} id='btn_singUp_mobile'>
						Sing Up
					</button>
				</div>
			</div>
			<div className='container_btn_sing_web'>
				<button onClick={e => history.push('/login')} id='btn_singIn'>
					Sing In
				</button>
				<button onClick={e => history.push('/singup')} id='btn_singUp'>
					Sing Up
				</button>
			</div>
		</div>
	)
}

export default HeaderHome
