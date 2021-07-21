import React from 'react'
import {Link} from 'react-router-dom'

const About = () => {
    return (
        <div className='about'>
            <h4>Version 1.0.0</h4>
            <Link to='/' className="link">Go To Home</Link>
        </div>
    )
}

export default About
