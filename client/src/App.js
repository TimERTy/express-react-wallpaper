import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            text: 'Summoner Name',
            summonerName: '',
            accountId: '',
            matches: [],
            champName: '',
            champNum: 0,
        };
        this.getChampion = this.getChampion.bind(this);
    }

    getAccountId() {
        //Gets the api based off of the summoner name provided
        fetch('/api/accountId/' + this.state.summonerName)
            .then(res => {
                return res.json();
            })
            .then(data => this.setState({accountId: data.accountId}));
        this.getMatchHistory();
    }

    getMatchHistory() {
        //this function will
        fetch('/api/matchHistory/' + this.state.accountId)
            .then(res => res.json())
            .then(data => this.setState({matches: data, champNum: data[0].champion}));
        this.getChampName();
    }

    getChampName() {
        //this function will
        fetch('/api/champName/' + this.state.champNum)
            .then(res => res.json())
            .then(data => this.setState({champName: data.champName}));
    }

    getChampion() {
        //League of Legends Api
        //  This function uses lol dev api to figure out the last played champion played by the user
        //  The User will input thier IGN (in game name) which will then trigger an api search
        this.getAccountId();
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1>Project Home</h1>
                    <input
                        className="App-input"
                        type="text"
                        id="text"
                        value={this.state.text}
                        onChange={e => {
                            let regex = new RegExp('^[0-9a-zA-Z _.]+$');
                            if (regex.test(e.key)) {
                                this.setState({text: e.target.value});
                            } else {
                                console.log('bad');
                            }
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                this.setState({summonerName: this.state.text});
                                this.getChampion();
                            }
                        }}
                    />
                    <div className="App-details">
                        <p>{this.state.accountId ? this.state.accountId : 'No Account ID'}</p>
                        <p>{this.state.summonerName ? this.state.summonerName : 'No Summoner Name'}</p>
                        <p>{this.state.matches[0] ? this.state.matches[0].champion : 'No Matches'}</p>
                        <p>{this.state.champName ? this.state.champName : 'No Champion Name'}</p>
                    </div>
                </header>
            </div>
        );
    }
}

export default App;
