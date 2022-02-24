import React from "react";
import Final from "./Final";


class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: [],
            battle: false,
            active1: false,
            active2: false,
            result: false,
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.firstElementChild.value);
        fetch(`https://api.github.com/users/${e.target.firstElementChild.value}`)
            .then((data) => data.json())
            .then((data) => {
                console.log(data);
                const { player } = this.state;
                this.setState({ player: [...player, data] })
            })
    }

    handleBattle = () => {
        this.setState({
            battle: true,
            result: true,
        })
    }

    handleClose = (e) => {
        const index = e.target.id;

        this.setState({
            player: this.state.player.filter((item, i) => {

                return i + 1 !== Number(index)
            })

        })

    }
    handleReset = () => {
        this.setState({
            battle: false,
            player: [],
            active1: false,
            active2: false,
        })
    }
    handleChange1 = () => {
        this.setState({
            active1: true,
        })

    }
    handleChange2 = () => {
        this.setState({
            active2: true,
        })

    }

    render() {
        if (!this.state.battle) {
            return (
                <div>
                    <div className="container battle-ground">
                        <h1>Players</h1>
                        <div className="players">
                            {!this.state.player[0] ?
                                <div className="player">
                                    <span>Player One</span>
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <input placeholder="github username" onChange={this.handleChange1} />
                                        <input type="submit" placeholder="" value="SUBMIT" className={this.state.active1 ? "active1" : ""} />
                                    </form>
                                </div>

                                : <div className="battle-user">

                                    <figure>
                                        <img src={this.state.player[0].avatar_url} alt={this.state.player[0].login} />
                                    </figure>

                                    <a href={this.state.player[0].html_url} className="link">{this.state.player[0].login}</a>
                                    <div>
                                        <span onClick={(e) => this.handleClose(e)} ><i class="fas fa-times-circle" id={1}></i></span>
                                    </div>
                                </div>
                            }
                            {!this.state.player[1] ?
                                <div className="player">
                                    <span>Player Two</span>
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <input placeholder="github username" onChange={this.handleChange2} />
                                        <input type="submit" placeholder="" value="SUBMIT" className={this.state.active2 ? "active1" : ""} />
                                    </form>
                                </div>
                                : <div className="battle-user">
                                    <figure>
                                        <img src={this.state.player[1].avatar_url} alt={this.state.player[1].login} />

                                    </figure>
                                    <a href={this.state.player[1].html_url} className="link">{this.state.player[1].login}</a>
                                    <div>
                                        <span onClick={(e) => this.handleClose(e)} ><i class="fas fa-times-circle" id={2}></i></span>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className="submit-button">
                            {
                                this.state.player.length === 2 ? <button onClick={this.handleBattle}>Battle</button> : <></>
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Final players={this.state.player} reset={this.handleReset} />
        }
    }
}

export default Battle;