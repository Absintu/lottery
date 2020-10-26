import React, {Component} from 'react'
import {Image} from 'semantic-ui-react'
import title from './title.png'
import './TitleBar.css'
//import {Link} from '../routes'

class TitleBar extends Component {
    render(){
        return(
            <div className='TitleBar'><Image src={title} size='large' /></div>
        );
    }
}

export default TitleBar;