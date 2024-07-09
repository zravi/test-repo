const ProfileService = require('../service/profile.service');


const createProfile = async (req, res) => {
    try {
        const profile = await ProfileService.createProfile(req.body);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getProfiles = async (req, res) => {
    try {
        const profiles = await ProfileService.getProfiles();
        res.status(200).json(profiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getProfileById = async (req, res) => {
    try {
        const profile = await ProfileService.getProfileById(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateProfile = async (req, res) => {
    try {
        const profile = await ProfileService.updateProfile(req.params.id, req.body);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteProfile = async (req, res) => {
    try {
        const profile = await ProfileService.deleteProfile(req.params.id);
        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ error: 'Profile not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { createProfile, getProfiles, getProfileById, updateProfile, deleteProfile };
