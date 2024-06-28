# EstateEase

EstateEase is a web application that serves as a marketplace for real estate, featuring a modern and intuitive user interface. It connects buyers, sellers, and agents, providing a seamless platform for real estate transactions and interactions.

![EstateEase Demo](https://github.com/mohdnoman/EstateEase/blob/main/client/public/website-prev.jpeg?raw=true)

## Features

- **Property Listings:** Browse and search for properties with detailed descriptions, images, and pricing information.
- **User Profiles:** Create and manage user profiles for buyers, sellers, and agents.
- **Advanced Search:** Utilize filters to find properties based on various criteria such as location, price range, property type, and more.
- **Listings Management:** Allows sellers and agents to easily add, edit, and remove property listings.
- **Responsive Design:** A modern UI that is fully responsive and optimized for both desktop and mobile devices.

## Tech Stack

- **Frontend Framework:** React.js - For building dynamic and responsive user interfaces.
- **Backend Framework:** Express.js - A minimal and flexible Node.js web application framework.
- **Database:** MongoDB - A NoSQL database for storing property listings, user profiles, and other data.
- **Backend Runtime:** Node.js - For executing server-side JavaScript code.
- **Animation Library:** GSAP (GreenSock Animation Platform) - For creating high-performance animations.
- **Cloud Storage:** Firebase Cloud Storage - For securely storing and serving user-uploaded images and files.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/mohdnoman/estate-ease.git
   ```
   
2. Install dependencies for frontend and backend:
   ```
   cd estate-ease
   npm install
   cd client
   npm install
   cd ..
   ```
   
3. Set up environment variables:
   - Create a `.env` file in the root directory and add the following:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_uri
     CLOUD_STORAGE_URL=your_firebase_storage_url
     ```
   
4. Start the backend server:
   ```
   npm run server
   ```
   
5. Start the frontend development server:
   ```
   cd client
   npm start
   ```

## Usage

- Visit `http://localhost:3000` to view the application in your browser.
- Explore property listings, create user profiles, and utilize advanced search features.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.


## Contact

For questions or feedback, please contact [Mohd Noman](mailto:mohdnoman2751@gmail.com).
