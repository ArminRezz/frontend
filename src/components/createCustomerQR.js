// Frontend component for creating a customer QR code
// This component allows business users to generate a QR code
// The QR code contains the customer's ID and can be used by customers to check in
import React, { useState } from 'react';

function CreateCustomerQR({ customerId }) {
    // State to store the generated QR code image data
    const [qrCode, setQrCode] = useState(null);
    const [qrCodeString, setQrCodeString] = useState(null);

    // Show message if no customer ID provided
    if (!customerId) {
        console.log('No customer ID provided.');
        return <p>No customer ID provided.</p>;
    }

    // Handle button click to generate QR code
    const handleGenerateQRCode = async () => {
        console.log('Generating QR Code for customer ID:', customerId);
        try {
            const response = await fetch('/api/customerQR/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: customerId
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

    const buttonStyle = {
        background: 'var(--primary)',
        border: '0',
        color: '#fff',
        padding: '10px',
        fontFamily: '"Poppins"',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div className="qr-form">
            <h2>Generate QR Code for Customer</h2>
            <p>Customer ID: {customerId}</p>
            <button style={buttonStyle} onClick={handleGenerateQRCode}>Generate QR Code</button>
            {/* Display QR code image if one has been generated */}
            {qrCode && (
                <div>
                    <h3>Customer QR Code:</h3>
                    <img src={qrCode} alt="Customer QR Code" />
                    <p>{qrCodeString}</p>
                </div>
            )}
        </div>
    );
}

export default CreateCustomerQR;