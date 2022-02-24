import React from "react";
import Loader from "./Loader";

class GitHub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTag: "All",
            data: null,
        }
    }
    componentDidMount() {
        if (this.state.activeTag === "All") {
            fetch("https://api.github.com/search/repositories?q=stars:%3E1+language:All&sort=stars&order=desc&type=Repositories")
                .then((data) => data.json())
                .then((data) => {this.setState({ data: data})
                })
        }
    }
    handleClick = (e) => {
        this.setState({
            activeTag: e.target.innerText,
            data: null,
        })
        fetch(`https://api.github.com/search/repositories?q=stars:%3E1+language:${e.target.innerText}&sort=stars&order=desc&type=Repositories`)
            .then((data) => data.json())
            .then((data) => {this.setState({ data: data })
        })
    }
    render() {
        if (!this.state.data) {
            return <Loader />
        } else {
            const repos = this.state.data;
            return (
                <div>
                    <div className="tags container">

                        <span onClick={(e) => this.handleClick(e)} className={this.state.activeTag === "All" ? "active" : ""}>All</span>
                        <span onClick={(e) => this.handleClick(e)} className={this.state.activeTag === "JavaScript" ? "active" : ""}>JavaScript</span>
                        <span onClick={(e) => this.handleClick(e)} className={this.state.activeTag === "Ruby" ? "active" : ""}>Ruby</span>
                        <span onClick={(e) => this.handleClick(e)} className={this.state.activeTag === "Java" ? "active" : ""}>Java</span>
                        <span onClick={(e) => this.handleClick(e)} className={this.state.activeTag === "CSS" ? "active" : ""}>CSS</span>
                        <span onClick={(e) => this.handleClick(e)} className={this.state.activeTag === "Python" ? "active" : ""}>Python</span>
                    </div>
                    <div className="container all-repo">
                        {
                            repos.items.map((r, i) => {
                                return (
                                    <div key={r.id} className="repo flex">
                                        <strong>#{i + 1}</strong>
                                        <figure>
                                            <img src={r.owner.avatar_url} alt="" />
                                        </figure>
                                        <span ><a href={r.html_url} className="bold">{r.full_name.split('/').pop()}</a></span>
                                        <div className="elm">
                                            
                                            <div className="margin">
                                                <i class="fas fa-user user"></i>
                                                <span><a href={r.html_url} className="bold-black">{r.full_name.split('/').pop()}</a></span>
                                            </div>

                                            <div className="margin">
                                                <i class="fas fa-star star"></i>
                                                <span>{r.watchers} stars</span>
                                            </div>

                                            <div className="margin">
                                                <i class="fas fa-code-branch git"></i>
                                                <span className="fork">{r.forks} forks</span>
                                            </div>

                                            <div className="margin">
                                                <i class="fas fa-exclamation-triangle issue"></i>
                                                <span>{r.open_issues} issues</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )
        }
    }
}

export default GitHub;