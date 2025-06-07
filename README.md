# 🛠️ Skip Size Page Redesign – React Frontend Challenge

This project is a redesign of the "Choose Your Skip Size" page from [https://wewantwaste.co.uk](https://wewantwaste.co.uk), based on the coding challenge instructions provided.

---

## 🎯 Task Overview

- **Original Page**:  
  Go to [wewantwaste.co.uk](https://wewantwaste.co.uk), enter postcode `LE10 1SH`, select an address, choose **garden waste**, and you'll reach the "Choose Your Skip Size" page.

- **Goal**:  
  Visually redesign this page to look **completely different** while keeping all core functionality intact.

- **Key Requirements**:
  - Use **React** to build the UI
  - Keep all user interactions functional (selecting skip, seeing prices, continuing)
  - Make it **responsive** for both desktop and mobile
  - Use live data from the following API:
    ```
    https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
    ```

---

## 🧑‍💻 Features & Approach

- Responsive, mobile-friendly layout
- Clean and modern design with complete visual overhaul
- Skip options dynamically fetched from the API
- Highlight selected skip with visual cues
- Total price (including VAT) calculated as:
  ```js
  const totalPrice = skip.price_before_vat * (1 + skip.vat / 100);
  ```
- Fully functional proceed/continue button (stubbed for demo)

---

## 🚀 Tech Stack

- React with Hooks
- CSS or TailwindCSS (if used)
- Fetch API for remote data
- Vite (for dev environment)

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- npm

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skip-redesign.git
   cd skip-redesign
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and go to:
   ```
   http://localhost:5000
   ```

---

## 🌐 Live Preview

You can view a live version of the redesigned page here:  
🔗 [CodeSandbox Link](https://codesandbox.io/s/your-sandbox-link)

---


## 📝 Notes

- The project was built in response to a frontend challenge.
- All UI design and layout are original.
- Data can be dynamically changed by modifying the API parameters.
- Responsive design tested across multiple breakpoints.

---

## 📧 Contact

For any questions or follow-ups, feel free to reach out.

Thanks for reviewing this submission!
