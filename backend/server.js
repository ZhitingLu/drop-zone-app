// Import required modules
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth20');
const path = require('path');
const multer = require('multer');
const { google } = require('googleapis');
const fs = require('fs');



// Create an Express app
const app = express();

// Set up session middleware
app.use(
    session({
        secret: 'your_session_secret',
        resave: false,
        saveUninitialized: false,
    })
);

// Configure Passport.js
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.REACT_APP_GOOGLE_CLIENT_TOKEN,
            clientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback', 
        },
        (accessToken, refreshToken, profile, done) => {
            // Custom callback logic for handling authentication
            // access user information in the 'profile' object
            // and perform any necessary operations (e.g., create a user, save user details in a database, etc.)
            // The 'done' callback should be called to proceed with authentication
            return done(null, profile);
        }
    )
);


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Set the destination folder where files will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the filename to be unique
    },
});

// Set up the Google Drive API client
const drive = google.drive({
    version: 'v3',
    auth: process.env.REACT_APP_GOOGLE_CLIENT_TOKEN, 
});


const upload = multer({ storage: storage });


// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    // Access the uploaded file details from req.file
    const fileName = req.file.filename;
    const filePath = req.file.path;
  
    // Upload the file to Google Drive
    const fileMetadata = {
      name: fileName,
    };
    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(filePath),
    };
  
    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id',
      },
      (err, file) => {
        if (err) {
          console.error('Error uploading file to Google Drive:', err);
          return res.status(500).json({ error: 'Failed to upload file to Google Drive' });
        }
  
        // Remove the temporary file
        fs.unlinkSync(filePath);
  
        // Get the file ID from the response
        const fileId = file.data.id;
  
        return res.status(200).json({ message: 'File uploaded successfully', fileId: fileId });
      }
    );
  });
  


// Serialize and deserialize user data
passport.serializeUser((user, done) => {
    // Serialize user data and store it in the session
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // Retrieve user data from the session
    done(null, user);
});

// Serve the React app build folder
app.use(express.static(path.join(__dirname, 'build')));

// Define routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Start the server
const port = process.env.PORT || 3001; // Use the environment port if available
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
