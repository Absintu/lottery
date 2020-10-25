import React, {Component} from 'react'
import {Card} from 'semantic-ui-react'
import sushi from './sushi.png'
import './Lottery.css'

class LotterySushi extends Component{
    render(){
        return(
            <Card className='Lottery'
                  image={sushi}
                  header='Sushi Lottery'
                  meta='0x4a347CB7238bD946C0A2965771faA97ac8caCCd5'
                  description='Enter the lottery with 1 Ticket = 1 Sushi'
                  /* extra={extra} */
            />
        )
    }
}

export default LotterySushi