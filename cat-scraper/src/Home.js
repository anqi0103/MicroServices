import React from 'react';
import axios from 'axios';
import './Home.css';
import App from './App.js';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "Home",
    };
    
    this.onClickHome = this.onClickHome.bind(this);
    this.onClickCommunity = this.onClickCommunity.bind(this);

  }

  onClickHome() {
    this.setState({currentPage: "Home"})
  }

  onClickCommunity() {
      this.setState({currentPage: "Community"});
  }

  render() {
    let page = null;
    if (this.state.currentPage === "Home") {
        page = <div>
                <div className="CatText">
                    The cat (Felis catus) is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. A cat can either be a house cat, a farm cat or a feral cat; the latter ranges freely and avoids human contact.Domestic cats are valued by humans for companionship and their ability to hunt rodents. About 60 cat breeds are recognized by various cat registries.
                </div> 
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Cat_poster_1.jpg/1920px-Cat_poster_1.jpg" class="HomeCat"></img>
            </div>
    } else if (this.state.currentPage === "Community") {
        page = <App />
    }
    return (
      <div className="Home">
          <div>
            <button className="HomeButton" onClick={this.onClickHome}>Home</button>
            <button className="CommunityButton" onClick={this.onClickCommunity}>Community</button>
          </div>
          {page}      
      </div>
    );
  }
}

export default Home;