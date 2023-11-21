const admin = require('firebase-admin');
const multer = require('multer');
const serviceAccount = require('./nala-firebase-admin-sdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'nala-6d763.appspot.com'
});

const upload = multer(); // Initialize multer without any options to handle multipart/form-data

// Middleware to handle file upload
const uploadMiddleware = upload.single('file');

// Function to handle file upload
exports.uploadImage = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      uploadMiddleware(req, res, (err) => {
        if (err) {
          reject('Error uploading file.');
        }
        resolve();
      });
    });

    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = admin.storage().bucket();
    const fileName = `${Date.now()}_${file.originalname}`;

    const fileUpload = bucket.file(fileName);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (error) => {
      console.error(error);
      return res.status(500).send('Error uploading file.');
    });

    blobStream.on('finish', async () => {
      try {
        // Set the file to be publicly accessible
        await fileUpload.makePublic();

        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        return res.status(200).send(publicUrl);
      } catch (error) {
        console.error(error);
        return res.status(500).send('Error setting file permissions.');
      }
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error uploading file.');
  }
};


exports.listFiles = async (req, res) => {
  try {
    const bucket = admin.storage().bucket();
    const [files] = await bucket.getFiles();

    const fileNames = files.map(file => file.name);
    return res.status(200).json(fileNames);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error retrieving file list.');
  }
};

exports.getFile = async (req, res) => {
  try {
    const { fileName } = req.body;

    if (!fileName) {
      return res.status(400).send('File name is required in the request body.');
    }

    const bucket = admin.storage().bucket();
    const file = bucket.file(fileName);

    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).send('File not found.');
    }

    const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    return res.status(200).json({ downloadUrl });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error retrieving file.');
  }
};
