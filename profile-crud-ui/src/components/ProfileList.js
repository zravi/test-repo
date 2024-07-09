import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileItem from './ProfileItem';
import ProfileForm from './ProfileForm';
import './ProfileList.css';  // Import CSS for styling
import Modal from './Modal';
import config from '../constant';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const response = await axios.get(`${config.BASE_URL}/profile`);
      setProfiles(response.data);
    };

    fetchProfiles();
  }, []);

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // const handleEdit = (profile) => {
  //   setSelectedProfile(profile);
  //   setIsEditing(true);
  // };

  const handleDelete = async (id) => {
    await axios.delete(`${config.BASE_URL}/profile/${id}`);
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  // const handleSave = async () => {
  //   const response = await axios.get('http://localhost:5000/v1/profile');
  //   setProfiles(response.data);
  //   setIsEditing(false);
  //   setSelectedProfile(null);
  // };

  const handleSave = async () => {
    const response = await axios.get(`${config.BASE_URL}/profile`);
    setProfiles(response.data);
    setIsEditing(false);
    setSelectedProfile(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
      <div className="profile-cards">
        {profiles.map((profile) => (
          <ProfileItem
            key={profile.id}
            profile={profile}
            onEdit={() => handleEdit(profile)}
            onDelete={() => handleDelete(profile.id)}
          />
        ))}
      </div>
      <Modal show={isModalOpen} onClose={closeModal}>
        {selectedProfile && (
          <ProfileForm profile={selectedProfile} onSave={handleSave} />
        )}
      </Modal>
    </div>

  );
};

export default ProfileList;
