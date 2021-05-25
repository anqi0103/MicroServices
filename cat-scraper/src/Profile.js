import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileInfo: [],
    };
    this.onClick = this.onClick.bind(this);
  }

  render() {
    return (
      <div className="CatProfile">
        <div
          className="EachProfile"
          style={{ backgroundImage: `url(${this.props.eachCat})` }}
        />
      </div>
    );
  }
}

export default Profile;
