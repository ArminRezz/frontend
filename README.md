# QuickRefer Frontend Documentation
![Screenshot 2025-02-03 022325](https://github.com/user-attachments/assets/f6a0be23-72d8-4786-9030-fe5c34522bca)

## Overview


The QR Code Management System is a web application built with React that allows business users to generate QR codes for their customers. This application facilitates easy check-in and data collection by enabling customers to fill out their information via QR codes. The system is designed to enhance customer interaction and streamline the process of managing customer data.

## Features

- **Business QR Code Generation**: Authenticated business users can generate QR codes containing their email, which can be scanned by customers.
- **Customer QR Code Generation**: Business users can create QR codes for individual customers, allowing for easy check-in.
- **Customer Management**: Users can add, view, and delete customer records.
- **Potential Customer Form**: Customers can fill out their information when accessing the form via a QR code link.
- **Responsive Design**: The application is designed to be responsive and user-friendly across various devices.

## Technologies Used

- **Frontend**: React, React Router, Context API
- **Styling**: CSS
- **API**: RESTful API for backend communication

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/qr-code-management-system.git
   cd qr-code-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

In the project directory, you can run:

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Removes the single build dependency from your project.

## Code Structure

- **src/**: Contains all the source code for the application.
  - **components/**: Reusable components such as `CreateBusinessQR`, `CreateCustomerQR`, `CustomerDetails`, `CustomerForm`, and `CustomerTable`.
  - **context/**: Context providers for managing global state (e.g., `AuthContext`, `CustomersContext`, `PCustomersContext`).
  - **hooks/**: Custom hooks for managing authentication and customer data.
  - **pages/**: Different pages of the application (e.g., `Home`, `Login`, `Signup`, `CustomerCreation`, `PotentialCustomerForm`).
  - **App.js**: Main application component that sets up routing and context providers.
  - **index.js**: Entry point of the application.
  - **index.css**: Global styles for the application.

## Component Descriptions

### CreateBusinessQR

This component allows authenticated business users to generate a QR code containing their email. It checks for user authentication and handles the form submission to generate the QR code.

### CreateCustomerQR

This component allows business users to generate a QR code for a specific customer. It takes the customer ID as a prop and handles the QR code generation process.

### Home

The Home component serves as the main dashboard for authenticated users. It integrates various components, including the business QR code generator, customer form, and tables displaying customer data.

### CustomerCreation

This component handles customer creation for non-logged-in users via a special link. It retrieves the business email from the URL query parameters and creates a customer associated with that business.

### PotentialCustomerForm

This component renders a form for potential customers to fill out their information. It is accessed via a QR code that contains a unique ID in the URL. Once submitted, the form locks to prevent duplicate submissions.

### CustomerDetails

This component displays detailed information about a customer and provides an option to delete the customer record.

### CustomerForm

This component allows business users to add new customers. It validates input fields and submits the data to the backend.

### CustomerTable

This component displays a table of customers, allowing business users to view and manage their customer records.

## State Management

The application uses the Context API for state management. Key contexts include:

- **AuthContext**: Manages the authentication state of business users.
- **CustomersContext**: Manages the list of customers for the authenticated business user.
- **PCustomersContext**: Manages potential customer records fetched via QR code links.

## API Integration

The frontend communicates with the backend through various API endpoints, using the fetch API. Below are the key API integrations:

### Authentication

- **POST /api/businessUser/signup**
  - **Description**: Registers a new business user.
  - **Request Body**: 
    - `email`: String, required
    - `password`: String, required
  - **Response**: Returns the created user object or an error message.

- **POST /api/businessUser/login**
  - **Description**: Authenticates a business user.
  - **Request Body**: 
    - `email`: String, required
    - `password`: String, required
  - **Response**: Returns the authenticated user object and a JWT token.

### QR Code Generation

- **POST /api/businessQR/create**
  - **Description**: Generates a QR code for the authenticated business user.
  - **Request Body**: 
    - `businessUserEmail`: String, required
  - **Response**: Returns the generated QR code data and a form URL.

- **POST /api/customerQR/create**
  - **Description**: Generates a QR code for a specific customer.
  - **Request Body**: 
    - `customerId`: String, required
  - **Response**: Returns the generated QR code data.

### Customer Management

- **GET /api/customers**
  - **Description**: Fetches all customers for the authenticated business user.
  - **Headers**: 
    - `Authorization`: Bearer token
  - **Response**: Returns an array of customer objects.

- **POST /api/customers**
  - **Description**: Creates a new customer record.
  - **Request Body**: 
    - `name`: String, required
    - `phone`: String, required
  - **Response**: Returns the created customer object.

- **DELETE /api/customers/:id**
  - **Description**: Deletes a customer record by ID.
  - **Headers**: 
    - `Authorization`: Bearer token
  - **Response**: Returns the deleted customer object.

### Potential Customer Management

- **GET /api/pcustomers**
  - **Description**: Fetches all potential customers.
  - **Headers**: 
    - `Authorization`: Bearer token
  - **Response**: Returns an array of potential customer objects.

- **POST /api/pcustomers**
  - **Description**: Creates a new potential customer record.
  - **Request Body**: 
    - `name`: String, required
    - `phone`: String, required
  - **Response**: Returns the created potential customer object.

## Styling

Styles are defined globally in `src/index.css` along with component-specific inline styles. Key style choices include:

- **Global Settings**: Google fonts are imported, and CSS variables define primary and error colors.
- **Component-Specific Styles**: Forms and tables have dedicated CSS classes for consistent styling.

## Conclusion

The QR Code Management System is a robust application designed to streamline customer interactions for businesses. With its user-friendly interface and efficient data management capabilities, it enhances the overall customer experience. Feel free to explore the code and contribute to its development!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
