import React from 'react';
import axios from 'axios';
import Profile from './Profile';
import './App.css';
import Modal from './Modal';

let ENDPOINTCat = '/cats';
let ENDPOINTMatchedCat = '/catSearch';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchInfo: '',
      selectedCat: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
    this.onCatSelected = this.onCatSelected.bind(this);
    this.getCats = this.getCats.bind(this);
  }

  handleChange(e) {
    this.setState({
      searchInfo: e.target.value,
    });
  }

  onClickSearch() {
    axios
      .get(ENDPOINTMatchedCat + `/?searchInfo=${this.state.searchInfo}`)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch(console.log);
  }

  getCats() {
    axios
      .get(ENDPOINTCat)
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch(console.log);
  }

  componentDidMount() {
    this.getCats();
  }

  onClickAdd() {
    let modal = document.querySelector('.MyModal');
    modal.style.display = 'block';
  }

  onClickClose() {
    document.querySelector('.App').classList.remove('ProfilePictureClicked');
  }

  onCatSelected(imageURL, breed, name, age, location, status, information) {
    this.setState({
      selectedCat: {
        imageURL: imageURL,
        breed: breed,
        name: name,
        age: age,
        location: location,
        status: status,
        information: information,
      },
    });
  }

  render() {
    return (
      <div className="App">
        <div className="">
          <header className="App-header">Cat Community</header>      
          <div className="App-search-button">
            <input
              type="text"
              className="SearchBar"
              onChange={this.handleChange}
              placeholder="search cat..."
            />
            <button className="SearchButton" onClick={this.onClickSearch}>
              Go Cat !
            </button>
          </div>
        </div>
        <div className="ProfilePicture">
          <div className="Container">
            <button className="AddButton" onClick={this.onClickAdd}>
              <svg
                viewBox="0 0 24 24"
                width="120"
                height="120"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M21 11c0-.552-.448-1-1-1s-1 .448-1 1c0 .551.448 1 1 1s1-.449 1-1m3 .486c-1.184 2.03-3.29 4.081-5.66 5.323-1.336-1.272-2.096-2.957-2.103-4.777-.008-1.92.822-3.704 2.297-5.024 2.262.986 4.258 2.606 5.466 4.478m-6.63 5.774c-.613.255-1.236.447-1.861.573-1.121 1.348-2.796 2.167-5.287 2.167-.387 0-.794-.02-1.222-.061.647-.882.939-1.775 1.02-2.653-2.717-1.004-4.676-2.874-6.02-4.287-1.038 1.175-2.432 2-4 2 1.07-1.891 1.111-4.711 0-6.998 1.353.021 3.001.89 4 1.999 1.381-1.2 3.282-2.661 6.008-3.441-.1-.828-.399-1.668-1.008-2.499.429-.04.837-.06 1.225-.06 2.467 0 4.135.801 5.256 2.128.68.107 1.357.272 2.019.495-1.453 1.469-2.271 3.37-2.263 5.413.008 1.969.773 3.799 2.133 5.224" />
              </svg>
              <div className="Middle">
                <div className="text">Add your cat</div>
              </div>
            </button>
          </div>
          <Modal getCats={this.getCats} />
          {this.state.data.map((item) => (
            <Profile
              key={item._id}
              eachCat={item}
              onCatSelected={this.onCatSelected}
            />
          ))}
        </div>
        <div className="Preview Preview--open">
          <button className="action action--close" onClick={this.onClickClose}>
            <i className="fa fa-times"></i>
            <span class="text-hidden">Close</span>
          </button>
          <div className="SelectedCatDisplay">
            <img
              className="SelectedCat"
              style={{
                opacity: 1,
                maxWidth: '3000px',
                maxHeight: '400px',
                transform: 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1)',
              }}
              src={this.state.selectedCat.imageURL}
              alt="SelectedImage"
            />
            <div className="SelectedCatNameMargin">
              Cat Breed: {this.state.selectedCat.breed}
            </div>
            <div>Cat Name: {this.state.selectedCat.name}</div>
            <div>Cat Age: {this.state.selectedCat.age}</div>
            <div>Cat Location: {this.state.selectedCat.location}</div>
            <div>Cat status: {this.state.selectedCat.status}</div>
            <div>Cat information: {this.state.selectedCat.information}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
