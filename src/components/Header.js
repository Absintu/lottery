import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'
import title from './title.svg'
//import {Link} from '../routes'

class Header extends Component {
    render(){
        return(
            <div><Image src={title} size='small' /></div>
        );
    }
}

export default Header;