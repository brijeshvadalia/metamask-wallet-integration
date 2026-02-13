# GetBlock Web3 Wallet Assignment

A **professional, clean, and focused** Web3 wallet interface built for the GetBlock Junior Frontend Engineer assignment. This application demonstrates **high-quality frontend development** with essential Web3 functionality, clean UI/UX, and professional design principles.

## 🚀 Features

### **Core Functionality** ✅
- **MetaMask Wallet Integration** - Seamless connection with automatic provider recovery
- **Real-time Balance Display** - Shows ETH and USDT balances on Ethereum Mainnet
- **Account Management** - Connect/disconnect wallet with proper state management
- **Error Handling** - Graceful error handling with toast notifications
- **Loading States** - Smooth loading indicators during balance fetching
- **Page Refresh Support** - Maintains connection state across page reloads

### **Professional UI/UX** 🎨
- **Clean Interface** - Focused, uncluttered design without unnecessary complexity
- **Smooth Animations** - Subtle transitions and hover effects
- **Toast Notifications** - Non-intrusive feedback system
- **Responsive Design** - Perfect on mobile, tablet, and desktop
- **Modern Design** - Professional gradients, shadows, and typography
- **Light Theme Only** - Simplified, professional appearance

### **Essential Features** ⭐
- **Address Management** - Copy address and view on Etherscan
- **Balance Refresh** - Manual balance updates with loading states
- **Connection Status** - Clear visual indicators for wallet state
- **Professional Footer** - Clean branding and links
- **Auto-Recovery** - Automatic provider initialization on page refresh

### **Technical Excellence** 🛠
- **Next.js 14** - Latest React framework with App Router
- **TypeScript** - Full type safety and better developer experience
- **Tailwind CSS** - Modern utility-first CSS framework
- **Ethers.js v6** - Industry-standard Web3 library with proper BigInt handling
- **Custom Hooks** - Reusable wallet management logic
- **Component Architecture** - Modular, maintainable, and scalable structure
- **Lucide Icons** - Professional icon library

## 🎯 Design Philosophy

### **Simplicity & Professionalism**
- **Clean Interface** - Removed unnecessary tabs and complex features
- **Focused Experience** - Core wallet functionality without distractions
- **Professional Design** - Modern, business-ready appearance
- **User-Friendly** - Intuitive navigation and clear information hierarchy

### **What Makes This Special:**
1. **Clean & Focused** - Professional interface without complexity
2. **Smooth Animations** - Professional micro-interactions
3. **Error Handling** - Comprehensive error management
4. **Responsive Design** - Perfect on all devices
5. **Professional Branding** - Clean, business-ready appearance
6. **Reliable State Management** - Maintains connection across refreshes

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Web3**: Ethers.js v6, MetaMask
- **Icons**: Lucide React
- **UI Components**: Custom component library with animations
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Build Tools**: Static export for Netlify deployment

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd folder name
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Usage

### **Connecting Your Wallet**
1. Ensure you have MetaMask installed in your browser
2. Click the "Connect MetaMask" button
3. Approve the connection request in MetaMask
4. Your wallet will connect and display your balances

### **Viewing Balances**
- **ETH Balance**: Shows your Ethereum balance with 4 decimal places
- **USDT Balance**: Shows your Tether USD balance with 2 decimal places
- **Refresh**: Click the refresh button to update balances

### **Wallet Features**
- **Address Display**: Shortened wallet address with copy functionality
- **Copy Address**: One-click address copying with toast confirmation
- **View on Etherscan**: Direct blockchain explorer integration
- **Disconnect**: Clean disconnection with state reset
- **Refresh Balances**: Manual balance updates with loading states
- **Auto-Recovery**: Automatic provider initialization on page refresh

## 🔧 Configuration

### **Network Configuration**
- **Network**: Ethereum Mainnet
- **USDT Contract**: 0xdAC17F958D2ee523a2206206994597C13D831ec7
- **Chain ID**: 1 (Ethereum Mainnet)

## 🔒 Security Considerations

- **No Private Keys**: Application never handles private keys
- **Read-Only**: Only reads public blockchain data
- **MetaMask Security**: Leverages MetaMask's security model
- **HTTPS Required**: Production deployment requires HTTPS
- **Input Validation**: All inputs are properly validated

## 🧪 Testing

The application includes comprehensive error handling for:
- MetaMask not installed
- Wallet connection rejection
- Network connectivity issues
- Balance fetching failures
- Account switching scenarios
- Page refresh provider recovery
- Toast notification system

### **Technical Demonstrations:**
- **React Patterns**: Custom hooks, state management
- **Modern CSS**: Tailwind with custom animations
- **Web3 Integration**: Proper BigInt handling and error management
- **Component Architecture**: Reusable, modular components
- **TypeScript**: Full type safety throughout
- **Build Optimization**: Static export with performance optimizations

---

### Time Investment
- **Development Time**: ~2.5 hours
- **Features Implemented**: Core wallet functionality with professional UI and provider recovery
- **Technologies Used**: Next.js, TypeScript, Tailwind CSS, Ethers.js, Lucide
- **AI Tools**: WindSurf for code assistance and optimization

### **Key Differentiators**
- **Clean Interface** - Professional, focused design
- **Essential Features** - Core functionality done right
- **Professional Design** - Business-ready appearance
- **Error Handling** - Comprehensive error management
- **Responsive Design** - Perfect on all devices
- **Reliable State Management** - Maintains connection across refreshes
