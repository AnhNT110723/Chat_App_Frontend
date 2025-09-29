# ChatApp Frontend 🌐

## Overview

This project is the frontend of a real-time chat application built with **Vite** and **React**. It provides a user interface for login/registration, real-time messaging (one-on-one and group chats), group management (create, delete, add/kick members), and displays message seen status. The application integrates with the backend via **Socket.IO** for real-time communication.

## Technologies Used 🛠️

- **Vite**: Fast build tool for modern applications.
- **React**: JavaScript library for building user interfaces.
- **Socket.IO**: Real-time communication with the backend.
- **Tailwind CSS**: Flexible CSS framework for responsive design.
- **Emoji Picker**: Add emojis to messages.
- **ESLint**: Ensures code quality.
- **dotenv**: Manages environment variables.

## Project Structure 📂
```
Chat_App_Frontend/
├── public/             # Static files (logos, sounds) 🌄
│   ├── assets/         # Image assets
│   ├── react.svg       # React logo
│   └── sounds/         # Notification sounds
├── src/                # Main source code 🚀
│   ├── components/     # React components 🧩
│   │   ├── ChatHeader.jsx
│   │   ├── ChatInput.jsx
│   │   ├── ChatInterface.jsx
│   │   ├── CreateGroupModal.jsx
│   │   ├── GroupOptionsModal.jsx
│   │   ├── LoginRegisterForm.jsx
│   │   ├── MessageList.jsx
│   │   └── Sidebar.jsx
│   ├── hooks/          # Custom hooks 🎣
│   ├── services/       # API services ⚙️
│   │   └── api.js
│   ├── App.css         # Global styles 🎨
│   ├── App.jsx         # Main component
│   ├── index.css       # Common styles
│   ├── main.jsx        # Application entry point
│   └── vite-env.d.ts   # Environment variable definitions
├── .gitignore          # Git ignore file 🗑️
├── .env                # Environment variables 🌱
├── eslint.config.js    # ESLint configuration 🔍
├── index.html          # Root HTML file 🖥️
├── package-lock.json   # NPM lock file 🔒
├── package.json        # Dependencies and scripts 📦
├── README.md           # This file 📝
└── vite.config.js      # Vite configuration ⚙️
```

## Features ✨

- **User Authentication**: Login/registration with a user-friendly interface.
- **Real-Time Messaging**: Send and receive messages instantly in one-on-one or group chats.
- **Group Management**:
  - Create groups with members.
  - Delete groups (creator only).
  - Add/kick members from groups.
- **Message Status**: Display list of users who have seen the message.
- **Notifications**: Sound alerts and unread message counts.
- **Beautiful UI**: Gradient design and smooth animations with Tailwind CSS.
- **Emoji Support**: Add emojis to messages with `emoji-picker-react`.
- **Responsive**: Supports various screen sizes.

## Installation 🛠️

1. **Clone Repository**:
```
git clone <repository-url>
cd Chat_App_Frontend
```

2. **Install Dependencies**:
```
npm install
```

3. **Configure Environment Variables**:
Create a `.env` file in the root directory with the following:

```
VITE_API_URL=https://chat-app-backend-v2bg.onrender.com # Backend URL (adjust based on environment)
```

4. **Run the Application**:

```
npm run dev
```
Open your browser at `http://localhost:5173` (or the port specified by Vite).

## Component Structure 🧩

- **App.jsx**: Main component managing global state (login, messages, groups).
- **ChatInterface.jsx**: Main chat interface with sidebar and message area.
- **MessageList.jsx**: Displays message list with seen status.
- **LoginRegisterForm.jsx**: Login/registration form.
- **CreateGroupModal.jsx & GroupOptionsModal.jsx**: Modals for creating and managing groups.
- **Sidebar.jsx**: Sidebar showing users and groups.

## Customization 🎨

- **Styling**: Uses Tailwind CSS and custom CSS animations in `App.css` for gradient and slide-in effects.
- **Sound**: `notification.mp3` in `public/sounds/` plays for new messages.
- **Emoji**: Integrated `emoji-picker-react` for a rich user experience.

## Troubleshooting 🛡️

- **Socket Connection Issues**: Ensure `VITE_API_URL` matches the backend.
- **Messages Not Updating**: Verify Socket.IO client and server versions match.
- **Build Errors**: Run `npm run build` to check Vite configuration.

## Contributing 🤝

Contributions are welcome! Fork the repo, create a branch, and submit a pull request.

## License 📜

This project is licensed under the MIT License.
