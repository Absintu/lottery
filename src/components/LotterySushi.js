import React, {Component} from 'react'
import {Card, Icon} from 'semantic-ui-react'
import uni from './uni.svg'

class LotteryUni extends Component{
    render(){
        return(
            <Card
                image={uni}
                header='Sushiswap Lottery'
                meta='Open until TODO'
                description='Enter the lottery with 1 Uni = 1 Ticket'
                extra={<a>
                        <Icon name='user' ref="https://goerli.etherscan.io/address/0x4a347CB7238bD946C0A2965771faA97ac8caCCd5"/>
                        Contract adress:
                        0x11fAD5BD0A1eB9178810c660F2EEF9B5271E4af9
                    </a>}
            />
        )
    }
}

export default LotteryUni