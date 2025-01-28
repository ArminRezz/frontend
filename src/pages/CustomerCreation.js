// This component handles customer creation for non-logged in users via a special link
// It gets the business email from the URL query params and creates a customer associated with that business

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CustomerCreation = () => {
    // State for form fields and validation
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

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
            setName('');
            setPhone('');
            console.log('Customer created successfully:', json);
        }
    }

    console.log('emptyFields:', emptyFields);

    return (
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
            />

            {/* Phone input field */}
            <label>Phone:</label>
            <input 
                type="text" 
                onChange={(e) => setPhone(e.target.value)} 
                value={phone} 
                className={emptyFields.includes('phone') ? 'error' : ''}
            />

            <button>Add Customer</button>
            {/* Display any error messages */}
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default CustomerCreation;