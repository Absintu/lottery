import React, {Component} from 'react'
import {Card} from 'semantic-ui-react'
import ethereum from './ethereum.png'

class LotteryEth extends Component{
    render(){
        return(
            <Card className='Lottery'
                  image={ethereum}
                  header='Ethereum Lottery'
                  meta='0x4a347CB7238bD946C0A2965771faA97ac8caCCd5'
                  description='Enter the lottery with 1 Ticket = 1 Eth'
                  /* extra={extra} */
            />
        )
    }
}

export default LotteryEth