import React from 'react';
import {Link} from 'react-router-dom';

export default function StartGame({blue, red, gamecode, input}) {
	
		return (
			<Link to={`/${gamecode}/${input}`}><button className='g2gBtn'>Go to game</button></Link>
	 )

}