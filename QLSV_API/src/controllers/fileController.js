const path = require('path');
const fs = require('fs');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');

const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ errorCode: 1, message: 'No files were uploaded.' });
    }

    const result = await uploadSingleFile(req.files.image);
    return res.status(200).json({
        errorCode: result.status === 'success' ? 0 : 1,
        data: result
    });
};

const postUploadMultipleFileAPI = async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ errorCode: 1, message: 'No files were uploaded.' });
    }

    if (Array.isArray(req.files.image)) {
        const result = await uploadMultipleFiles(req.files.image);
        return res.status(200).json({
            errorCode: 0,
            data: result
        });
    } else {
        return await postUploadSingleFileAPI(req, res);
    }
};
const getImageAPI = async (req, res) => {
    const imageName = req.params.imageName;
    console.log(imageName)
    const imagePath = path.join(__dirname, '../public/images/upload', imageName);

    if (fs.existsSync(imagePath)) {
        res.sendFile(imagePath);
    } else {
        res.status(404).json({
            errorCode: 1,
            message: 'Image not found'
        });
    }
};

module.exports = {
    postUploadSingleFileAPI,
    postUploadMultipleFileAPI,
    getImageAPI
};