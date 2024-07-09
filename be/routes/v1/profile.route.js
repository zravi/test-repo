const express = require('express');
const validateRequest = require('../../middlewares/validateRequest');
const ProfileController = require('../../controller/profile.controller');
const profileCreateSchema = require('../../validation/profileValidation');


const router = express.Router();

router.post('/',validateRequest(profileCreateSchema), ProfileController.createProfile);
router.get('/', ProfileController.getProfiles);
router.get('/:id', ProfileController.getProfileById);
router.put('/:id', ProfileController.updateProfile);
router.delete('/:id', ProfileController.deleteProfile);

module.exports = router;
