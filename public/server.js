const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express(); //Create an instance of the express server
const path = require('path');
const multer = require('multer'); //Include multi-part dependency to parse images
const cors = require('cors'); //Import cors to allow cross-origin resource sharing
const PORT = 5000;

const imagesPath = path.join(__dirname, '../app/public/images');

// Ensure the images folder exists
if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
}

// Configure Multer to save to the React public/images folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imagesPath); // Absolute path to save images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create multer instance with storage configuration
const upload = multer({ storage: storage });

app.use(bodyParser.json());// parses json data coming into the api/ express server

app.use(cors({
    origin: 'http://localhost:3000',  
    methods:
     ['GET', 'POST'],  // Allow GET and POST methods
    allowedHeaders: ['Content-Type'], 
}));

app.get('/', (req, res) => {
    res.send('Welcome to your express server');
});

app.listen(PORT, () => {
    console.log(`Express is running on http://localhost:${PORT}`)
})

app.post('/add-comment', (req, res) =>{
   const { postId, comment, username, profile } = req.body; // This is the request from the commentData in Post.js coming from the user's comment. We have to declare the commentData object so the express server can read it into the request body and process it to the continuing conditions and functions below.

    // Validate input to ensure the user has no missing fields, which are necessary to maintain integrity of the data in posts.json
    if (!postId || !comment || !username || !profile) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

// Read posts from posts.json and update 
const postsPath = path.resolve(__dirname, '../app/public', 'posts.json');  

fs.readFile(postsPath, 'utf8', (err, data) => { // Read posts from posts.json and update
    if (err) {
        console.log('Error reading posts.json file:', err); // Log the error for debugging 
        return res.status(500).send({ message: 'Error reading posts.json file' });
    }
        const posts = JSON.parse(data);
        const post = posts.find(p => p.id === postId);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        const newComment = {   // Add the comment to the post
            id: String(post.comments.length + 1),  // Comment ID based on the current comments length
            user: { username, profile },  
            comment,
            created: 'just now'  // Use time / date library to display actual times for your posts and comments (Refer to CIS 120 Javascript section for the Date library)
        };
post.comments.push(newComment);

        // Save the updated posts back to posts.json
        fs.writeFile(postsPath, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ message: 'Error writing to posts.json file' });
            }

            res.send({ message: 'Comment added successfully', post });
        });
    });
});
    //create add-post endpoint to process the post form data object 
  app.post('/add-post', upload.single('image'), (req, res) => {
      const { description, username, profile } = req.body;
    
      // Validate required fields
      if (!req.file || !username || !description || !profile) {
        return res.status(400).json({ message: 'Missing required fields or image.' });
      }
    
      const postsPath = path.resolve(__dirname, '../app/public', 'posts.json');
    
      fs.readFile(postsPath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading posts.json:', err);
          return res.status(500).json({ message: 'Error reading posts.json' });
        }
    
        let posts = [];
        try {
          posts = JSON.parse(data);
        } catch (parseErr) {
          console.error('Error parsing posts.json:', parseErr);
        }
    
        const newPost = {
          id: (posts.length + 1).toString(),
          user: {
            username,
            profile
          },
          comments: [],
          likes: 0,
          image: `/images/${req.file.filename}`,
          description,
          created: 'just now'
        };
    
        posts.push(newPost);
    
        fs.writeFile(postsPath, JSON.stringify(posts, null, 2), (writeErr) => {
          if (writeErr) {
            console.error('Error writing to posts.json:', writeErr);
            return res.status(500).json({ message: 'Error saving post' });
          }
    
          return res.status(200).json({ message: 'Post added successfully', post: newPost });
        });
      });
    });

      //POST endpoint for adding a new user
      app.post('/signup', upload.single('profileImage'), (req, res) => {
        const { username, password, bio } = req.body;
      
        if (!username || !password || !req.file) {
          return res.status(400).json({ message: 'Missing required fields or image.' });
        }
      
        const usersPath = path.resolve(__dirname, '../app/public', 'users.json');
      
        fs.readFile(usersPath, 'utf8', (err, data) => {
          if (err) {
            console.error('Error reading users.json:', err);
            return res.status(500).json({ message: 'Error reading users.json' });
          }
      
          let users = [];
          try {
            users = JSON.parse(data);
          } catch (parseErr) {
            console.error('Error parsing users.json:', parseErr);
          }
      
          /* 
          Check for existing user. Don't want username to be the same as
          another user
          */
          if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: 'Username already exists' });
          }
      //new user object that matches the users.json format
          const newUser = {
            username,
            password,
            profile: `/images/${req.file.filename}`,
            bio
          };
      
          users.push(newUser);
      
          fs.writeFile(usersPath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
              console.error('Error writing to users.json:', writeErr);
              return res.status(500).json({ message: 'Error saving user' });
            }
      
            return res.status(200).json({ message: 'Signup successful', user: newUser });
          });
        });
      });

