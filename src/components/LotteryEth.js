import React, {Component} from 'react'
import {Card, Icon, Image} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ethereum from './ethereum.png'
import './Lottery.css'

class LotteryEth extends Component{
    render(){
        return(  <div className='Lottery'>
            <Card background-color='transparent'>
                <Image src={ethereum} wrapped ui={false} size='medium'/>
                <Card.Content>
                <Card.Header>Ethereum Lottery</Card.Header>
                <Card.Meta>
                    <span className='date'>Open until TODO</span>
                </Card.Meta>
                <Card.Description>
                Enter the lottery with 1 Ticket = 1 Eth
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a>
                    <Icon name='user' />
                    Contract adress:
                    0x17135A630a53F43309E5C4A30c5cdC11185cCc4A
                </a>
                </Card.Content>
            </Card>
            </div>
        )
    }
}

export default LotteryEth