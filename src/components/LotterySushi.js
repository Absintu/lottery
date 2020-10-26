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
                    0x4a347CB7238bD946C0A2965771faA97ac8caCCd5
                </a>}
            />
        )
    }
}

export default LotterySushi