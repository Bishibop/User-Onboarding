import React from 'react';

function User({ user }) {
  return (
    <p>{`${user.name}, ${user.email}, ${user.role}, ${user.tos ? 'Accepted TOS' : 'Did not accept TOS'}`}</p>
  );
}

export default User
