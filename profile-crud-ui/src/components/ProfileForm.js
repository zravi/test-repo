import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../constant';
import './ProfileForm.css';

const ProfileForm = ({ profile, onSave }) => {
  const [name, setName] = useState(profile ? profile.name : '');
  const [email, setEmail] = useState(profile ? profile.email : '');
  const [age, setAge] = useState(profile ? profile.age : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { name, email, age: Number(age) };

    if (profile) {
      await axios.put(`${config.BASE_URL}/profile/${profile.id}`, profileData);
    } else {
      await axios.post(`${config.BASE_URL}/profile/`, profileData);
    }

    onSave();
  };

  return (
    <div className=''>
      <div className="profileAdd-card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" required />
        <button type="submit">Save</button>
      </form> */}
    </div>
  );
};

export default ProfileForm;
