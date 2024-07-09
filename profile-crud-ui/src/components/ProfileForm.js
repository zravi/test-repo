import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileForm = ({ profile, onSave }) => {
  const [name, setName] = useState(profile ? profile.name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [age, setAge] = useState(profile ? profile.age : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { name, email, age: Number(age) };

    if (profile) {
      await axios.put(`http://localhost:5000/v1/profile/${profile.id}`, profileData);
    } else {
      await axios.post('http://localhost:5000/v1/profile', profileData);
    }

    onSave();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default ProfileForm;
