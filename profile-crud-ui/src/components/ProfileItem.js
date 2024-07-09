import React from 'react';

const ProfileItem = ({ profile, onEdit, onDelete }) => (
  <li>
    <h3>{profile.name}</h3>
    <p>Email: {profile.email}</p>
    <p>Age: {profile.age}</p>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
  </li>
);

export default ProfileItem;
