<h1>🎫 Dynamic NFT Tickets & Loyalty (PS-3)</H1>

A modern Web3 ticketing platform that transforms event passes into dynamic, verifiable NFT collectibles. Built with React, Firebase Authentication, and blockchain technology for secure, fraud-resistant event management.

![Dynamic NFT Tickets Demo](https://img.shields.io/badge/Status-Demo%20Ready-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3+-06B6D4)

## 🚀 Features

### 🔐 **Authentication System**
- **Email/Password Authentication** via Firebase
- **Google Sign-In** integration
- **Protected Routes** - Users must authenticate to access dashboard
- **Session Management** - Persistent login across browser sessions

### 🎨 **Modern UI/UX**
- **Dark Theme** with glassmorphism effects
- **Fully Responsive** design (mobile-first approach)
- **Smooth Animations** and hover transitions
- **Professional Component Library** with Tailwind CSS

### 🌐 **Web3 Integration**
- **Wallet Connection** via RainbowKit (MetaMask, WalletConnect, etc.)
- **Multi-Chain Support** (Polygon Mumbai testnet ready)
- **Smart Contract Integration** for NFT minting and management
- **Real-time Transaction Status** tracking

### 🎫 **Dynamic NFT Tickets**
- **Mint Tickets** with event selection and tier options
- **Auto-detect Owned Tokens** via ERC-721 enumerable
- **Dynamic Metadata** that updates based on attendance status
- **IPFS Integration** for decentralized metadata storage
- **Status Tracking**: Unused → Checked-in → Participated

### 🔒 **Anti-Fraud Features**
- **Dynamic QR Codes** (rotating/time-boxed sessions)
- **On-chain Owner Verification** before status updates
- **Duplicate Scan Prevention** 
- **Session-based Check-ins** with expiry

## 🏗️ Architecture

┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Frontend │ │ Backend │ │ Smart Contract │
│ React + TS │◄──►│ Node/Express │◄──►│ ERC-721 NFT │
│ Tailwind CSS │ │ Metadata API │ │ Polygon Mumbai │
└─────────────────┘ └─────────────────┘ └─────────────────┘
│ │ │
▼ ▼ ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ Firebase │ │ IPFS │ │ Wagmi │
│ Authentication │ │ File Storage │ │ Web3 Provider │
└─────────────────┘ └─────────────────┘ └─────────────────┘


## 🛠️ Tech Stack

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **RainbowKit + Wagmi + Viem** for Web3 integration
- **React Router DOM** for client-side routing
- **Lucide React** for icons

### **Authentication**
- **Firebase Auth** for user management
- **Google OAuth** integration
- **Protected route components**

### **Blockchain**
- **ERC-721** smart contracts (OpenZeppelin)
- **Polygon Mumbai** testnet
- **Dynamic metadata** via backend API
- **IPFS** for decentralized storage

### **Development**
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** for CSS processing
- **Node.js** backend (planned)

## 📦 Installation

### **Prerequisites**
- Node.js 18+ and npm
- Git
- Modern web browser with MetaMask or Web3 wallet

### **1. Clone Repository**

git clone https://github.com/PraffulRajj/ps3-dynamic-tickets.git <br>
cd ps3-dynamic-tickets

### **2. Install Dependencies**


### **3. Environment Setup**
Create `.env` file in project root:


### **4. Firebase Configuration**
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id

### **5. Blockchain Configuration**
VITE_CHAIN_ID=80001
VITE_API_URL=http://localhost:3001
VITE_TICKET_ADDRESS=0xYourContractAddress

### **6. WalletConnect Project ID**
VITE_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id

### **7. Firebase Setup**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: `ps3-dynamic-tickets`
3. Enable Authentication → Email/Password + Google
4. Add your domain to Authorized domains
5. Copy config to `.env` file

### **8. Smart Contract Setup**
1. Deploy `TicketNFT.sol` to Polygon Mumbai
2. Update `VITE_TICKET_ADDRESS` in `.env`
3. Replace ABI in `src/config/contract.ts`

### **9. Start Development**
npm run dev

Visit `http://localhost:5173` 🚀

## 📁 Project Structure

src/
├── components/ # Reusable React components
│ ├── Navbar.tsx # Navigation with auth + wallet
│ ├── Hero.tsx # Landing section
│ ├── MintSection.tsx # NFT minting interface
│ ├── MyTicketSection.tsx # View owned tickets
│ ├── StatusCard.tsx # NFT display card
│ └── ProtectedRoute.tsx # Auth guard component
├── pages/ # Route components
│ ├── Login.tsx # Authentication page
│ ├── Signup.tsx # User registration
│ └── Dashboard.tsx # Main app (protected)
├── contexts/ # React contexts
│ └── AuthContext.tsx # Firebase auth state
├── config/ # Configuration files
│ ├── firebase.ts # Firebase initialization
│ └── contract.ts # Smart contract ABI/address
├── lib/ # Utility functions
│ └── ipfs.ts # IPFS URL resolution
├── types/ # TypeScript definitions
│ └── nft.ts # NFT metadata interfaces
└── styles/
└── index.css # Global styles + Tailwind

## 🎯 Usage

### **For Event Attendees**

1. **Sign Up/Login**
   - Visit the app → Create account or sign in
   - Use email/password or Google authentication

2. **Connect Wallet**
   - Click "Connect Wallet" in navbar
   - Choose your preferred wallet (MetaMask recommended)
   - Ensure you're on Polygon Mumbai testnet

3. **Mint Event Ticket**
   - Select event from dropdown
   - Choose ticket tier (General, VIP, Premium)
   - Set quantity and click "Mint Ticket"
   - Confirm transaction in wallet

4. **View Your Tickets**
   - Navigate to "My Tickets" section
   - View owned tickets automatically detected
   - Or manually enter token ID to view any ticket

### **For Event Organizers**

1. **Create Session** (Backend required)
   - Generate time-boxed QR codes for entry
   - Set session parameters (duration, location)

2. **Check-in Process**
   - Display rotating QR code at venue entrance
   - Attendees scan QR → system verifies ownership
   - NFT status updates: Unused → Checked-in

## 🔧 Development

### **Available Scripts**
npm run dev # Start development server
npm run build # Build for production
npm run preview # Preview production build
npm run lint # Run ESLint

### **Adding New Components**
// src/components/NewComponent.tsx
function NewComponent() {
return (
<div className="glass-card rounded-2xl p-4">
{/* Component content */}
</div>
);
}

export default NewComponent;

### **Tailwind Utility Classes**
.glass-card /* Glassmorphism background /
.btn / Base button styles /
.btn-primary / Primary button (accent color) /
.btn-outline / Outlined button /
.input / Form input styling */

## 🚀 Deployment

### **Frontend (Netlify)**

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` to Git
- **Firebase Rules**: Configure proper Firestore security rules
- **Contract Verification**: Verify smart contracts on block explorer
- **HTTPS Only**: Always use HTTPS in production
- **Input Validation**: Validate all user inputs on frontend and backend

## 🤝 Team Roles & Contributions

### **Frontend Developer** (PRAFFUL RAJ)
- ✅ React + TypeScript application
- ✅ Tailwind CSS styling and responsive design
- ✅ Firebase Authentication integration
- ✅ Web3 wallet connection (RainbowKit)
- ✅ NFT minting and viewing interfaces

### **Smart Contract Developer** (ANJALI MISHRA)
- 🔄 ERC-721 NFT contract with dynamic metadata
- 🔄 Access control for minting and updates
- 🔄 Deploy to Polygon Mumbai testnet

### **Backend Developer**  (ANKIT KUMAR)
- 🔄 Express.js API server
- 🔄 Dynamic metadata endpoints
- 🔄 QR session management
- 🔄 Owner verification system

## 🐛 Troubleshooting

### **Common Issues**

**Build Errors:**
rm -rf node_modules package-lock.json <br>
npm install <br>
npm run dev

**Firebase Auth Errors:**
- Check Firebase project configuration
- Verify authorized domains include localhost
- Ensure Auth providers are enabled

**Wallet Connection Issues:**
- Install MetaMask browser extension
- Switch to Polygon Mumbai testnet
- Check WalletConnect project ID

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Demo & Screenshots

### **Authentication Flow**
![Login Page](https://via.placeholder.com/800x400/0A192F/00FF85?text=Login+Page)

### **Dashboard**
![Dashboard](https://via.placeholder.com/800x400/0A192F/00FF85?text=Dashboard+View)

### **NFT Minting**
![Mint Section](https://via.placeholder.com/800x400/0A192F/00FF85?text=Mint+Ticket+Interface) <br>
SOON IT WILL BE UPLOADED. 

## 🔗 Links

- **Live Demo**: IN PROCESS
- **Smart Contract**: [Polygon Mumbai Explorer](https://mumbai.polygonscan.com/)
- **Team Repository**: [GitHub](https://github.com/PraffulRajj/MintMoments)

## 📞 Support

For questions or support:
- **Email**: praffulraj123@gmail.com
- **Issues**: [GitHub Issues](https://github.com/yourusername/ps3-dynamic-tickets/issues)

---

**Built with ❤️ for Hackathon PS-3**  
*Transforming event experiences through blockchain technology*
