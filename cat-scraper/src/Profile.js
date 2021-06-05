import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    let imageURL = this.props.eachCat.imageURL;
    let breed = this.props.eachCat.breed;
    let name = this.props.eachCat.name;
    let age = this.props.eachCat.age;
    let location = this.props.eachCat.location;
    let status = this.props.eachCat.status;
    let information = this.props.eachCat.information;

    this.props.onCatSelected(
      imageURL,
      breed,
      name,
      age,
      location,
      status,
      information
    );

    document.querySelector('.App').classList.add('ProfilePictureClicked');
  }

  render() {
    return (
      <div className="CatProfile">
        <div
          className="EachProfile"
          style={{ backgroundImage: `url(${this.props.eachCat.imageURL})` }}
          onClick={this.onClick}
        />
      </div>
    );
  }
}

export default Profile;
