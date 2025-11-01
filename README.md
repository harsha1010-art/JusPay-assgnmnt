# Modern React Dashboard with Advanced Features

A modern, responsive admin dashboard built with React and Vite, featuring dark mode, real-time data visualization, and accessibility features.

🌐 [Live Demo](https://juspay-dashboard.netlify.app)  
🔗 [GitHub Repository](https://github.com/harsha1010-art/JusPay-assgnmnt)

## ✨ Features

- 📊 Data Visualization with Chart.js
- 🌙 Dark/Light Theme Toggle
- 🔄 Real-time Order Management
- 📱 Fully Responsive Design
- ♿ ARIA-compliant Accessibility
- 🎨 CSS Variables for Theming
- 🧩 Modular Component Architecture
- 📋 Interactive Orders Table with Filtering
- 🌍 World Map Revenue Visualization
- 📊 Multiple Chart Types (Line, Bar, Donut)

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.1.1
- **Build Tool:** Vite 7.1.7
- **Routing:** React Router DOM 7.9.5
- **Styling:** TailwindCSS 4.1.16
- **Charts:** Chart.js with react-chartjs-2
- **Icons:** Lucide React
- **State Management:** React Context API
  - Theme Context
  - Sidebar Context
  - Notification Context

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
├── context/           # React Context providers
├── data/             # Static data and mock APIs
├── hooks/            # Custom React hooks
├── pages/            # Page components
└── App.jsx           # Main application component
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/harsha1010-art/JusPay-assgnmnt.git
   cd JusPay-assgnmnt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📊 Features Breakdown

### Dashboard
- Real-time statistics cards
- Revenue trends with line charts
- Sales projections with bar charts
- Geographic revenue distribution
- Top products analysis

### Orders Management
- Advanced filtering and search
- Pagination
- Status tracking
- Bulk selection
- Responsive table design

### Navigation
- Collapsible sidebar
- Notifications panel
- Theme switching
- Quick search

## 🔄 State Management

The application uses React's Context API for state management, with three main contexts:

1. **ThemeContext**: Manages dark/light theme switching
2. **SidebarContext**: Controls sidebar collapse state
3. **NotificationContext**: Handles notification panel visibility

### Why Not Redux?
The current application state management needs are well-served by React Context due to:
- Localized state updates
- No complex state interactions
- No need for middleware
- No requirement for time-travel debugging
- Simple state persistence needs

## 🎨 Theming

The application uses CSS variables for comprehensive theming support:
- Light/Dark mode support
- Consistent color palette
- Dynamic component styling
- Accessible color contrasts

## 🔐 Routing

Routes are managed through React Router:
- `/` - Dashboard
- `/orders` - Orders Management

## 🌐 API Integration

Currently using static data in `data/orders.json`. To integrate with a backend:
1. Update data fetching in respective components
2. Add environment variables for API endpoints
3. Implement error handling and loading states

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Semantic HTML
- Color contrast compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Chart.js for data visualization
- Lucide React for icons
- TailwindCSS community
- React ecosystem
