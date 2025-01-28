// Frontend component for creating a business QR code
// This component allows authenticated business users to generate a QR code
// The QR code contains the business user's email and can be used by customers to check in
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function CreateBusinessQR() {
    // Get the authenticated business user from context
    const { businessUser } = useContext(AuthContext);
    // State to store the generated QR code image data
    const [qrCode, setQrCode] = useState(null);
    const [qrCodeString, setQrCodeString] = useState(null);

    // Show message if user is not authenticated
    if (!businessUser) {
        return <p>Please sign in to access this feature.</p>;
    }

    // Handle form submission to generate QR code
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/businessQR/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    businessUserEmail: businessUser.email,
                }),
            });
            const data = await response.json();
            console.log('API Response:', data); // Log the entire response
            if (response.ok) {
                setQrCode(data.qrCodeData);
                setQrCodeString(data.formUrl || 'No QR Code String'); // Set a default value
            } else {
                console.error('Failed to generate QR code:', data.error);
            }
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    console.log(qrCodeString);

    return (
        <div>
            <h1>Create Business QR Code</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Generate QR Code</button>
            </form>
            {/* Display QR code image if one has been generated */}
            {qrCode && (
                <div>
                    <h2>Your QR Code:</h2>
                    <img src={qrCode} alt="Business QR Code" />
                    <p> {qrCodeString} </p>
                </div>
            )}
        </div>
    );
}

export default CreateBusinessQR;