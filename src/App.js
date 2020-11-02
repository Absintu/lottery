import React,{ Component} from 'react'
import './App.css'
import web3 from './web3'
import TitleBar from './components/TitleBar'
import LotteryEthDaily from './components/LotteryEthDaily'
import LotteryEthWeekly from './components/LotteryEthWeekly'
import LotteryEthMonthly from './components/LotteryEthMonthly'
import LotterySushi from './components/LotterySushi'
import LotteryUni from './components/LotteryUni'
import {Grid, Image} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import monopoly_guy from './components/monopoly_guy.png'

class App extends Component {
  render(){/*   para confirmar que a wallet da metamask tinha injectado o Web3
    com sucesso (nova versao que supostamente vai ser compativel no futuro)
    web3.eth.getAccounts()
      .then(console.log);
*/
    return (
      <div className='App'>
          <div><TitleBar></TitleBar></div>
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column>
                <Image src={monopoly_guy} verticalAlign='bottom'/>
              </Grid.Column>
              <Grid.Column>
              <LotteryEthMonthly />
              </Grid.Column>
              <Grid.Column>
              <LotteryEthWeekly />
              </Grid.Column>
              <Grid.Column>
              <LotteryEthDaily />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className='Footer'>
          </div>
     </div>
    );
  }
}


export default App;
