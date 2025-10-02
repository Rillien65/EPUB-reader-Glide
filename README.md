# Jessica Hall Reader

A secure EPUB and audiobook reader built for Jessica Hall’s digital library.  
Powered by Firebase for content protection and Glide for app integration.

## 🔧 Features
- EPUB rendering with font controls and dark mode
- Audiobook playback with speed and resume
- Firebase-authenticated access to private content
- Hosted via GitHub Pages and embedded in Glide

## 📁 Project Structure

Jessica-Hall-Reader/
- index.html   #Main reader interface
- style.css    #Styling for reader and controls
- reader.js.   #EPUB rendering logic
- audio.js.    #Audiobook playback logic
- firebase-config.js   #Firebase setup for secure access
- README.md.   #Project overview and instructions
- gitignore.   #Prevents committing sensitive of bulky files

## 📦 Setup Instructions

1. Clone the repository:
git clone https://github.com/Rillien65/Jessica-Hall-Reader.git

2. Add your Firebase config to `firebase-config.js`

3. Upload EPUB and audio files to Firebase Storage

4. Open `index.html` in a browser or deploy via GitHub Pages

## 📜 License

MIT
