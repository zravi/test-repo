import React from 'react';
import './ProfileItem.css';  // Import CSS for styling

const ProfileItem = ({ profile, onEdit, onDelete }) => (
  <div className="profile-card">
    <h3>{profile.name}</h3>
    <p>Email: {profile.email}</p>
    <p>Age: {profile.age}</p>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>Delete</button>
  </div>
);

export default ProfileItem;
