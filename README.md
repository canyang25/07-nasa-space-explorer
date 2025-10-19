# NASA Space Explorer

An interactive web application that displays NASA’s Astronomy Picture of the Day (APOD) using the official NASA API.  
Users can select a custom date range to explore daily images, titles, and descriptions from NASA’s archive.

---

## Features

- Fetches real-time data from the **NASA APOD API**
- Supports **custom date range queries**
- Displays images, titles, and detailed descriptions
- Built-in **backend server** for API key protection and caching
- Responsive design optimized for desktop and mobile

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6)  
- **Backend:** Node.js with Express  
- **API:** NASA Astronomy Picture of the Day (APOD)  
- **Environment Management:** `.env` for API key storage  

---

## Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/07-nasa-space-explorer.git
cd 07-nasa-space-explorer

# Install dependencies
npm install

# Create a .env file and add your NASA API key
echo "API_KEY=your_nasa_api_key" > .env

# Start the server
node server.js
