const { Profile } = require('../models');


const createProfile = async (data) => {
    return await Profile.create(data);
}

const getProfiles = async () => {
    return await Profile.findAll();
}

const getProfileById = async (id) => {
    return await Profile.findByPk(id);
}

const updateProfile = async (id, data) => {
    const profile = await Profile.findByPk(id);
    if (profile) {
        return await profile.update(data);
    }
    return null;
}

const deleteProfile = async (id) => {
    const profile = await Profile.findByPk(id);
    if (profile) {
        await profile.destroy();
        return profile;
    }
    return null;
}


module.exports = { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile };
