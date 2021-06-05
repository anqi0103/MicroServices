import React from 'react';
import axios from 'axios';
import './Modal.css';

let ENDPOINTAddCat = '/upload';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: '',
      breed: '',
      name: '',
      age: '',
      location: '',
      status: '',
      information: '',
    };

    this.handleChangeBreed = this.handleChangeBreed.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeInfo = this.handleChangeInfo.bind(this);
    this.handleSelectedFile = this.handleSelectedFile.bind(this);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  handleChangeBreed(e) {
    this.setState({
      breed: e.target.value,
    });
  }

  handleChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  handleChangeLocation(e) {
    this.setState({
      location: e.target.value,
    });
  }

  handleChangeStatus(e) {
    this.setState({
      status: e.target.value,
    });
  }

  handleChangeInfo(e) {
    this.setState({
      information: e.target.value,
    });
  }

  handleSelectedFile(e) {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0],
    });
  }

  onClickClose() {
    let modal = document.querySelector('.MyModal');
    modal.style.display = 'none';
    let fileInput = document.querySelector('#imgFile');
    fileInput.value = null;
    this.setState({
      selectedFile: '',
      breed: '',
      name: '',
      age: '',
      location: '',
      status: '',
      information: '',
    });
  }

  onClickSubmit(event) {
    event.preventDefault();

    let data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('breed', this.state.breed);
    data.append('name', this.state.name);
    data.append('age', this.state.age);
    data.append('location', this.state.location);
    data.append('status', this.state.status);
    data.append('information', this.state.information);

    axios
      .post(ENDPOINTAddCat, data)
      .then(() => {
        this.props.getCats();
        this.onClickClose();
      })
      .catch(console.log);
  }

  render() {
    return (
      <div className="MyModal">
        <div className="Modal-Content">
          <span className="close" onClick={this.onClickClose}>
            &times;
          </span>
          <form className="FormDisplay">
            <input
              type="text"
              className="CatInfo"
              onChange={this.handleChangeBreed}
              placeholder="Breed"
              value={this.state.breed}
            />
            <br />
            <input
              type="text"
              className="CatInfo"
              onChange={this.handleChangeName}
              placeholder="Cat Name"
              value={this.state.name}
            />
            <br />
            <input
              type="text"
              className="CatInfo"
              onChange={this.handleChangeAge}
              placeholder="Cat Age"
              value={this.state.age}
            />
            <br />
            <input
              type="text"
              className="CatInfo"
              onChange={this.handleChangeLocation}
              placeholder="City, State"
              value={this.state.location}
            />
            <br />
            <div>
              <label for="cStatus">Status: </label>
              <select
                onChange={this.handleChangeStatus}
                value={this.state.status}
              >
                <option value="Select" className="Status">
                  Select
                </option>
                <option value="Available" className="Status">
                  Available
                </option>
                <option value="Adopted" className="Status">
                  Adopted
                </option>
                <option value="Missing" className="Status">
                  Missing
                </option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="file"
                className="ChooseFileMargin"
                name=""
                id="imgFile"
                onChange={this.handleSelectedFile}
              />
            </div>
            <br />
            <label for="information">Information(optional): </label>
            <br />
            <textarea
              className="Info"
              onChange={this.handleChangeInfo}
              value={this.state.information}
            />
            <br />
            <button
              className="SearchButton SubmitButton"
              onClick={this.onClickSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Modal;
