import React, {Component} from 'react'
import {Card, Icon} from 'semantic-ui-react'
import sushi from './sushi.png'
import './Lottery.css'

class LotterySushi extends Component{
    render(){
        return(
            <Card 
                  image={sushi}
                  header='Sushi Lottery'
                  meta='Open until TODO'
                  description='Enter the lottery with 1 Ticket = 1 Sushi'
                  extra={
                  <a>
                    <Icon name='user' />
                    Contract adress:
                    0x17135A630a53F43309E5C4A30c5cdC11185cCc4A
                </a>}
            />
        )
    }
}

export default LotterySushi