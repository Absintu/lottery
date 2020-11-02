import React, {Component, NavLink} from 'react'
import {Card, Grid, Icon, Header, Form, Input, Button} from 'semantic-ui-react'
import ethereum from './ethereum.png'
import './Lottery.css'
import lotteryEthWeeklyContract from '../lotteryEthWeeklyContract'
import web3 from '../web3'

class LotteryEthWeekly extends Component{
    state={
        manager: '',
        players: [],
        balance: '',
        value: '',
        message: '',
        lastWinner: '',
        lastBalance: '',
    }

    async componentDidMount(){
        try{
          const manager = await lotteryEthWeeklyContract.methods.manager().call();
          const players = await lotteryEthWeeklyContract.methods.getPlayers().call();
          const balance = await web3.eth.getBalance(lotteryEthWeeklyContract.options.address);
          const lastWinner = await lotteryEthWeeklyContract.methods.lastWinner().call();
    
          this.setState({manager, players, balance, lastWinner});
        } catch(error){
          console.log(error);
        }
    }

    onSubmit = async (event) => {
        event.preventDefault(); //evita que o evento venha em HTML
    
        const accounts = await web3.eth.getAccounts();
        this.setState({message: 'Waiting on transaction success...'});
        await lotteryEthWeeklyContract.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });
        this.setState({message: 'You have been entered!'})
    };

    onClick = async() => {
        const accounts = await web3.eth.getAccounts();
    
        this.setState({message: 'Waiting on transaction success...'});
        const balance = await web3.eth.getBalance(lotteryEthWeeklyContract.options.address);
        console.log(balance);
        await lotteryEthWeeklyContract.methods.pickWinner().send({
          from: accounts[0]
        });
        this.lastWinner = await lotteryEthWeeklyContract.methods.lastWinner().call();
        const winnerCongratsString = 'A winner has been picked!\n The Winner is ' +
                                      this.lastWinner +
                                      '\nTotal amount of reward: ' +
                                      web3.utils.fromWei(balance, 'ether') + 'ether!';
        this.setState({message: winnerCongratsString});
      };

    render(){
        return( <div className='Lottery'>
            <Grid.Column>
            <Card className='weekly'
                image={ethereum}
                header='Weekly Ethereum Lottery'
                meta='Open until TODO'
                description='Enter the lottery with 1 Eth = 1 Ticket'
                extra={
                    <a href={"https://goerli.etherscan.io/address/" +
                            lotteryEthWeeklyContract.options.address
                    }>
                    <Icon name='money' />
                    Contract adress:<br/>
                    {lotteryEthWeeklyContract.options.address}
                    </a>
                }
            />
            </Grid.Column>
            <Grid.Column>
                  <Header size='small'>
                        Last Winner:<br/>
                        <a href={"https://goerli.etherscan.io/address/" + this.state.lastWinner}>
                        {this.state.lastWinner}
                        </a>
                        <br/>There are currently {this.state.players.length} people entered,
                        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
                  </Header>
                  <hr/>
                  <Form onSubmit={this.onSubmit}>
                    <h2>Want to try your luck?</h2>
                    <div>
                      <label>Amount of ether to enter</label>
                      <Input 
                        focus 
                        placeholder='Search...' 
                        value={this.state.value}
                        onChange={event => this.setState({value: event.target.value})}
                      />
                    </div>
                    <Button primary>Enter Lottery</Button>
                  </Form>
                  <hr />
                    <h2>Ready to pick a winner?</h2>
                    <Button secundary onClick={this.onClick}>Pick a winner!</Button>
                  <hr />
                <h1>{this.state.message}</h1>
              </Grid.Column>
              </div>
        )
    }
}

export default LotteryEthWeekly