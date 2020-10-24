import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'
import title from './title.svg'
import './Header.css'
//import {Link} from '../routes'

class Header extends Component {
    render(){
        return(
            <div className='Header'><Image src={title} size='small' /></div>
        );
    }
}

export default Header;