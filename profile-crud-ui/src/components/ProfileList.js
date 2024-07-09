import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileItem from './ProfileItem';
import ProfileForm from './ProfileForm';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await axios.get('http://localhost:5000/v1/profile');
      setProfiles(response.data);
    };

    fetchProfiles();
  }, []);

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/v1/profile/${id}`);
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleSave = async () => {
    const response = await axios.get('http://localhost:5000/v1/profile');
    setProfiles(response.data);
    setIsEditing(false);
    setSelectedProfile(null);
  };

  return (
    <div>
      {isEditing ? (
        <ProfileForm profile={selectedProfile} onSave={handleSave} />
      ) : (
        <button onClick={() => setIsEditing(true)}>Add Profile</button>
      )}
      <ul>
        {profiles.map((profile) => (
          <ProfileItem
            key={profile.id}
            profile={profile}
            onEdit={() => handleEdit(profile)}
            onDelete={() => handleDelete(profile.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
