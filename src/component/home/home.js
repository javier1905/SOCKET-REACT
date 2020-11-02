import React from 'react'

import HeaderHome from '../headerHome/headerHome'
import MainHome from '../mainHome/mainHome'
import './home.css'

const Home = () => {
	return (
		<div className='container_home'>
			<div>
				<HeaderHome />
				<MainHome />
			</div>
		</div>
	)
}

export default Home
