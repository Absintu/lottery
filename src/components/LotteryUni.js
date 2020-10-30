import React, {Component} from 'react'
import {Card, Icon} from 'semantic-ui-react'
import uni from './uni.svg'

class LotteryUni extends Component{
    render(){
        return(
            <Card
                image={uni}
                header='Uniswap Lottery'
                meta='Open until TODO'
                description='Enter the lottery with 1 Ticket = 1 Sushi'
                extra={<a>
                        <Icon name='user' ref="https://goerli.etherscan.io/address/0x4a347CB7238bD946C0A2965771faA97ac8caCCd5"/>
                        Contract adress:
                        0x17135A630a53F43309E5C4A30c5cdC11185cCc4A
                    </a>}
            />
        )
    }
}

export default LotteryUni