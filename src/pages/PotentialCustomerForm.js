// This component renders a form for potential customers to fill out their information
// The form is accessed via a QR code that contains a unique ID in the URL
// Once submitted, the form is locked and cannot be edited

// The flow works as follows:
// 1. Business user generates a QR code with their email
// 2. Customer scans QR code which brings them to this form with ID in URL
// 3. Customer fills out name and phone number
// 4. Form submits data to backend which creates new potential customer record
// 5. Form locks to prevent duplicate submissions

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const PotentialCustomerForm = () => {
    // Form field states to track user input
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    
    // Error handling states
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    
    // States for after successful submission
    const [customerId, setCustomerId] = useState(null); // ID returned from backend
    const [isLocked, setIsLocked] = useState(false);    // Prevents editing after submit

    // State for success message
    const [successMessage, setSuccessMessage] = useState('');

    // Extract the customer ID from URL query parameters
    // This ID comes from the QR code that was scanned
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const id = query.get('id');

    // Handle form submission to create new potential customer
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare customer data for API
        const customer = { name, phone, id };

        // Validate that all required fields are filled
        const newEmptyFields = [];
        if (!name) newEmptyFields.push('name');
        if (!phone) newEmptyFields.push('phone');
        if (!id) newEmptyFields.push('id');

        if (newEmptyFields.length > 0) {
            setEmptyFields(newEmptyFields);
            setError('Please fill in all fields');
            return;
        }

        // Submit customer data to backend API
        const response = await fetch('/api/pcustomers', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                phone: phone,
                customer_id: id
            }),
            headers: { 
                'Content-Type': 'application/json',
            }
        });

        // Log the response for debugging
        console.log('Response:', response);

        const json = await response.json();

        // Handle API response
        if (!response.ok) {
            console.error('Error response:', json); // Log error details
            setEmptyFields(json.emptyFields);
            setError(json.error || 'An error occurred'); // Fallback error message
        }
        if (response.ok) {
            // Clear any previous errors
            setEmptyFields([]);
            setError(null);
            
            // Lock form and store returned customer ID
            setIsLocked(true);
            setCustomerId(json._id);
            
            // Set success message
            setSuccessMessage('Customer added successfully!', customerId);
        }
    };

    return (
        <>
            <form className="customer-form" onSubmit={handleSubmit}>
                <h3>Add Potential Customer</h3>
                <p>ID from query: {id} </p>

                <label>Name:</label>
                <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    className={emptyFields.includes('name') ? 'error' : ''}
                    disabled={isLocked}
                />

                <label>Phone:</label>
                <input 
                    type="text" 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone} 
                    className={emptyFields.includes('phone') ? 'error' : ''}
                    disabled={isLocked}
                />

                <button type="submit" disabled={isLocked}>Add Potential Customer</button>
                {error && <div className="error">{error}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
            </form>
        </>
    );
};

export default PotentialCustomerForm; 