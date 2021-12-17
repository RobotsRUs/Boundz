import React from 'react';
import axios from 'axios';

export default class UserInfo extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
    };
  }
  async componentDidMount() {
    let { data } = await axios.get('/api/users');
    this.setState({ users: data });
  }

  render() {
    return this.state.users.map((user) => (
      <div key={user.id}>
        <div>
          <h4>{user.username}</h4>
          <div>
            {user.firstName}&nbsp;{user.lastName}
          </div>
          <div>{user.email}</div>
          <div>{user.address1}</div>
          <div>{user.address2}</div>
          <div>{user.city}</div>
          <div>{user.state}</div>
          <div>{user.zipCode}</div>
          <div>{user.isAdmin ? 'Admin' : 'Customer'}</div>
        </div>
      </div>
    ));
  }
}
