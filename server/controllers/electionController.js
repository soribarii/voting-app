const {v4: uuid} = require("uuid")
const cloudinary = require('../utils/cloudinary')
const path = require("path")

const HttpError = require('../models/ErrorModel')
const ElectionModel = require('../models/electionModel')
const CandidateModel = require('../models/candidateModel')



// =================== ADD NEW ELECTION
// POST : api/elections
// PROTECTED (only admin)
const addElection = async (req, res, next) => {
    try {
        // only admin can add election
        if(!req.user.isAdmin) {
            return next(new HttpError("Only an admin can perform this action.", 403))
        }
        
        const {title, description} = req.body;
        if(!title || !description) {
            return next(new HttpError("Fill all fields.", 422))
        }

        if(!req.files.thumbnail) {
            return next(new HttpError("Choose a thumbnai.", 422))
        }

        const {thumbnail} = req.files;
        // image should be less than 1mb
        if(thumbnail.size > 1000000) {
            return next(new HttpError("File size too big. Should be less than 1mb"))
        }

        // rename the image
        let fileName = thumbnail.name;
        fileName = fileName.split(".")
        fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1]
        // upload file to upload folder in project
        await thumbnail.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
            if(err) {
                return next(new HttpError(err))
            }
            // store image on cloudinary
            const result = await cloudinary.uploader.upload(path.join(__dirname, "..", "uploads", fileName), {resource_type: "image"})
            if(!result.secure_url) {
                return next(new HttpError("Couldn't upload image to cloudinary", 422))
            }
            // save election to db
            const newElection = await ElectionModel.create({title, description, thumbnail: result.secure_url})
            res.json(newElection)
    })        
    } catch (error) {
        return next(new HttpError(error))
    }
}



// =================== GET ALL ELECTION
// GET : api/elections
// PROTECTED
const getElections = async (req, res, next) => {
    try {
        const elections = await ElectionModel.find();
        res.status(200).json(elections)
    } catch (error) {
        return next(new HttpError(error))
    }
}



// =================== GET SINGLE ELECTION
// GET : api/elections/:id
// PROTECTED
const getElection = async (req, res, next) => {
    try {
        const {id} = req.params;
        const election = await ElectionModel.findById(id)
        res.status(200).json(election)
    } catch (error) {
        return next(new HttpError(error))
    }
}



// =================== GET ELECTION CANDIDATES
// GET : api/elections/:id/candidates
// PROTECTED
const getCandidatesOfElection = async (req, res, next) => {
    try {
        const {id} = req.params;
        const candidates = await CandidateModel.find({election: id})
        res.status(200).json(candidates)
    } catch (error) {
        return next(new HttpError(error))
    }
}



// =================== GET VOTERS OF ELECTION
// GET : api/elections/:id/voters
// PROTECTED
const getElectionVoters = async (req, res, next) => {
    try {
        const {id} = req.params;
        const response = await ElectionModel.findById(id).populate('voters')
        res.status(200).json(response.voters)
    } catch (error) {
        return next(new HttpError(error))
    }
}



// =================== UPDATE ELECTION
// PATCH : api/elections/:id
// PROTECTED
const updateElection = async (req, res, next) => {
    try {
        // only admin can add election
        if(!req.user.isAdmin) {
            return next(new HttpError("Only an admin can perform this action.", 403))
        }
        
        const {id} = req.params;
        const {title, description} = req.body;
        if(!title || !description) {
            return next(new HttpError("Fill in all fields", 422))
        }
        if(req.files && req.files.thumbnail) {
            const {thumbnail} = req.files;
            // image size should be less than 1mb
            if(thumbnail > 1000000) {
                return next(new HttpError("Image size too big. Should be less than 1mb", 422))
            }

            // rename the image
            let fileName = thumbnail.name;
            fileName = fileName.split(".")
            fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1]  
            thumbnail.mv(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if(err) {
                    return next(new HttpError(err))
                }
                // store image on cloudinary
                const result = await cloudinary.uploader.upload(path.join(__dirname, '..', 'uploads', fileName), {resource_type: "image"})
                // check if cloudinary storage was successful
                if(!result.secure_url) {
                    return next(new HttpError("Image upload to cloudinary was not successful", 422))
                }

                await ElectionModel.findByIdAndUpdate(id, {title, description, thumbnail: result.secure_url})

                res.json("Election updated successfully", 200)
            })          
        } 
        else {
            await ElectionModel.findByIdAndUpdate(id, {
                title,
                description
            });

            return res.status(200).json("Election updated successfully");
        }
    } catch (error) {
        return next(new HttpError(error))
    }
}



// =================== DELETE ELECTION
// DELETE : api/elections/:id
// PROTECTED (only admin)
const removeElection = async (req, res, next) => {
    try {
        // only admin can add election
        if(!req.user.isAdmin) {
            return next(new HttpError("Only an admin can perform this action.", 403))
        }
        
        const {id} = req.params;
        await ElectionModel.findByIdAndDelete(id);
        // delete candidates that belong to this election
        await CandidateModel.deleteMany({election: id})
        res.status(200).json("Election deleted successfully.")
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = {addElection, getElections, getElection, updateElection, removeElection, getCandidatesOfElection, getElectionVoters}