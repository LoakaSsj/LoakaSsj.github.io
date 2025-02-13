const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');
const messageDiv = document.getElementById('message');
let noCount = 0;

noButton.addEventListener('click', () => {
    noCount++;
    noButton.style.fontSize = `${parseFloat(window.getComputedStyle(noButton).fontSize) * 0.8}px`;
    noButton.style.position = 'absolute';
    noButton.style.top = `${Math.random() * window.innerHeight - noButton.offsetHeight}px`;
    noButton.style.left = `${Math.random() * window.innerWidth - noButton.offsetWidth}px`;
    yesButton.style.fontSize = `${parseFloat(window.getComputedStyle(yesButton).fontSize) * 1.2}px`;

    // Log the "no" click (client-side - for demonstration)
    console.log(`No button clicked ${noCount} times.`);

    //  While client-side logging is possible, server-side logging is needed for persistence.
    //  This would require a server-side language (like Python, Node.js, PHP, etc.) and a database or file to store the counts.
    //  I'll provide a conceptual example below.
});

yesButton.addEventListener('click', () => {
    // Send email (requires a server-side solution)
    fetch('/send_email', { // Replace with your server endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ noCount: noCount }) // Send noCount to server
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Email sent successfully!');
        } else {
            console.error('Error sending email:', data.error);
        }
    });

    // Display the "I love you" message
    document.querySelector('.buttons').style.display = 'none'; // Hide buttons
    messageDiv.style.display = 'block';
});



// Example server-side (Node.js with Express) to handle email and logging:
/*
const express = require('express');
const nodemailer = require('nodemailer'); // For sending emails
const fs = require('fs'); // For file system operations (logging)

const app = express();
app.use(express.json());

// Configure email transporter (replace with your email credentials)
const transporter = nodemailer.createTransport({ ... });

app.post('/send_email', (req, res) => {
    const { noCount } = req.body;

    // Send email
    const mailOptions = {
        from: 'your_email@example.com',
        to: 'recipient_email@example.com',
        subject: 'Someone said YES!',
        text: `Someone said yes! They clicked "no" ${noCount} times before.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({ success: false, error: error.message });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true });

            // Log to file (server-side)
            const logMessage = `Date: ${new Date()}, No Count: ${noCount}\n`;
            fs.appendFile('proposal_log.txt', logMessage, (err) => {
                if (err) console.error("Error writing to log file:", err);
            });
        }
    });
});

// ... other server code ...
*/
