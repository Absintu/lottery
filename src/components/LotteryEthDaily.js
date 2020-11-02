import React, {Component} from 'react'
import {Card, Grid, Button,  Icon, Image, Header, Form, Input} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import ethereum from './ethereum.png'
import './Lottery.css'
import lotteryEthDailyContract from '../lotteryEthDailyContract'
import web3 from '../web3'

class LotteryEthDaily extends Component{

    /*  Same result as:
        constructor(props){
        super(props);
        this.state={manager: ''};
    }
    */
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
          const manager = await lotteryEthDailyContract.methods.manager().call();
          const players = await lotteryEthDailyContract.methods.getPlayers().call();
          const balance = await web3.eth.getBalance(lotteryEthDailyContract.options.address);
          const lastWinner = await lotteryEthDailyContract.methods.lastWinner().call();
    
          this.setState({manager, players, balance, lastWinner});
        } catch(error){
          console.log(error);
        }
    }

    onSubmit = async (event) => {
        event.preventDefault(); //evita que o evento venha em HTML
    
        const accounts = await web3.eth.getAccounts();
        this.setState({message: 'Waiting on transaction success...'});
        await lotteryEthDailyContract.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.value, 'ether')
        });
        this.setState({message: 'You have been entered!'})
    };

    onClick = async() => {
        const accounts = await web3.eth.getAccounts();
    
        this.setState({message: 'Waiting on transaction success...'});
        const balance = await web3.eth.getBalance(lotteryEthDailyContract.options.address);
        console.log(balance);
        await lotteryEthDailyContract.methods.pickWinner().send({
          from: accounts[0]
        });
        this.lastWinner = await lotteryEthDailyContract.methods.lastWinner().call();
        const winnerCongratsString = 'A winner has been picked!\n The Winner is ' +
                                      this.lastWinner +
                                      '\nTotal amount of reward: ' +
                                      web3.utils.fromWei(balance, 'ether') + 'ether!';
        this.setState({message: winnerCongratsString});
      };

    render(){
        return(  <div className='Lottery'>
            <Grid.Column>
            <Card className='daily'>
                <Image src={ethereum} wrapped ui={false} size='medium'/>
                <Card.Content font='red'>
                <Card.Header background='red'>Daily Ethereum Lottery</Card.Header>
                <Card.Meta>
                    <span className='date'>Open until TODO</span>
                </Card.Meta>
                <Card.Description>
                Enter the lottery with 1 Eth = 1 Ticket
                </Card.Description>
                </Card.Content>
                <Card.Content extra>
                <a href={"https://goerli.etherscan.io/address/" +
                            lotteryEthDailyContract.options.address
                    }>
                    <Icon name='money' />
                    Contract adress:<br/>
                    {lotteryEthDailyContract.options.address}
                </a>
                </Card.Content>
            </Card>
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

export default LotteryEthDaily