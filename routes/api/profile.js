const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Validation imports
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));


// @route   GET api/profile
// @desc    Get current user profile
// @access  Private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // Validation 
    const {errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if(!isValid) {
        // Return errors with 400 status
        return res.status(400).json(errors);
    }

    // Get fields
    const profleFields = {};
    profleFields.user = req.user.id;

    if(req.body.handle) profleFields.handle = req.body.handle;
    if(req.body.company) profleFields.company = req.body.company;
    if(req.body.website) profleFields.website = req.body.website;
    if(req.body.location) profleFields.location = req.body.location;
    if(req.body.bio) profleFields.bio = req.body.bio;
    if(req.body.status) profleFields.status = req.body.status;
    if(req.body.githubusername) profleFields.githubusername = req.body.githubusername;
    // Skils
    if(typeof req.body.skills !== 'undefined')  {
        profleFields.skills = req.body.skills.split(',');
    }

    // Social 
    profleFields.social = {};
    if(req.body.youtube) profleFields.social.youtube = req.body.youtube;
    if(req.body.twitter) profleFields.social.twitter = req.body.twitter;
    if(req.body.facebook) profleFields.social.facebook = req.body.facebook;
    if(req.body.instagram) profleFields.social.instagram = req.body.instagram;
    if(req.body.linkedin) profleFields.social.linkedin = req.body.linkedin;

    
    // Check if user already exists to determine 
    // if it is new user to create or Update existing
    Profile.findOne({user: req.user.id})
        .then(profile => {
            if(profile) {
                // Update
                Profile.findOneAndUpdate(
                    {user: req.user.id},
                    { $set: profleFields }, 
                    {new: true}
                )
                .then(profile => res.json(profile));
            } else {
                // Create

                // Check if handle exists
                Profile.findOne({handle: profleFields.handle})
                    .then(profile => {
                        if(profile) {
                            // There is a profile with that handle, give back an error
                            errors.handle = 'That handle already exists';
                            res.status(400).json(errors);
                        }

                            // Else, create profile
                            new Profile(profleFields).save()
                                .then(profile => res.json(profile));
                                
                    });
            }
        })
});

module.exports = router;
