// This component handles customer creation for non-logged in users via a special link
// It gets the business email from the URL query params and creates a customer associated with that business

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CreateCustomerQR from '../components/createCustomerQR';

const CustomerCreation = () => {
    // State for form fields and validation
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [customerId, setCustomerId] = useState(null);
    const [isLocked, setIsLocked] = useState(false);

    // Get email from URL query params
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const email = query.get('email');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create customer object with form data and business email
        const customer = { name, phone, email };

        // Validate that all required fields are filled
        const newEmptyFields = [];
        if (!name) newEmptyFields.push('name');
        if (!phone) newEmptyFields.push('phone');
        if (!email) newEmptyFields.push('email');

        console.log('newEmptyFields:', newEmptyFields);

        // Show error if any fields are empty
        if (newEmptyFields.length > 0) {
            setEmptyFields(newEmptyFields);
            setError('Please fill in all fields');
            return;
        }

        // Send POST request to create customer
        const response = await fetch('/api/customers/self', {
            method: 'POST',
            body: JSON.stringify(customer),
            headers: { 
                'Content-Type': 'application/json',
            }
        });
        const json = await response.json();

        // Handle response
        if (!response.ok) {
            setEmptyFields(json.emptyFields);
            setError(json.error);
        }
        if (response.ok) {
            // Reset form on success
            setEmptyFields([]);
            setError(null);
            // Keep the input values but lock the form
            setIsLocked(true);
            console.log('Customer created successfully:', json);
            setCustomerId(json._id);
            console.log('Customer ID:', json._id);
        }
    }

    const handleSendQRCode = async () => {
        if (!customerId || !phone) {
            setError('Customer ID and phone number are required to send the QR code.');
            return;
        }

        const response = await fetch('/api/customerQR/send ', {
            method: 'POST',
            body: JSON.stringify({ customerId: customerId }), // Send customerId and phoneNumber
            headers: { 
                'Content-Type': 'application/json',
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.message || 'Failed to send QR code.');
        } else {
            console.log('QR Code sent successfully:', json.qrCodeData);
            setError(null); // Clear any previous errors
        }
    }

    console.log('emptyFields:', emptyFields);

    return (
        <>
            <form className="customer-form" onSubmit={handleSubmit}>
                <h3>Add Customer</h3>
                <p>Email from query: {email} </p>

                {/* Name input field */}
                <label>Name:</label>
                <input 
                    type="text" 
                    onChange={(e) => setName(e.target.value)} 
                    value={name} 
                    className={emptyFields.includes('name') ? 'error' : ''}
                    disabled={isLocked}
                />

                {/* Phone input field */}
                <label>Phone:</label>
                <input 
                    type="text" 
                    onChange={(e) => setPhone(e.target.value)} 
                    value={phone} 
                    className={emptyFields.includes('phone') ? 'error' : ''}
                    disabled={isLocked}
                />

                <button type="submit" disabled={isLocked}>Add Customer</button>
                {/* New button to send QR code */}
                
                {/* Display any error messages */}
                {error && <div className="error">{error}</div>}
            </form>

            {/* Render the CreateCustomerQR component outside the form */}
            {customerId && <CreateCustomerQR customerId={customerId} />}
            {customerId && (
                    <button type="button" onClick={handleSendQRCode} disabled={!isLocked}>
                        Send QR Code
                    </button>
            )}
        </>
    );
}

export default CustomerCreation;