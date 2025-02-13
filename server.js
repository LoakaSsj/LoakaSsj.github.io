const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Configura el transporte de correo (reemplaza con tus credenciales)
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'tu_correo@gmail.com', // Reemplázalo con tu correo
        pass: 'tu_contraseña' // Reemplázalo con tu contraseña (usa una app password si usas Gmail)
    }
});

// Ruta para manejar la solicitud de registro y correo
app.post('/send_email', (req, res) => {
    const { noCount } = req.body;

    // Guardar en un archivo log
    const logMessage = `Fecha: ${new Date().toLocaleString()}, Veces que presionó "No": ${noCount}\n`;
    fs.appendFile('proposal_log.txt', logMessage, (err) => {
        if (err) {
            console.error("Error escribiendo en el log:", err);
            return res.json({ success: false, error: "Error al escribir el log" });
        }
    });

    // Configurar el correo
    const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: 'tu_correo@gmail.com', // Puedes enviarlo a ti mismo
        subject: '¡Dijo que sí! ❤️',
        text: `¡Tu novia aceptó ser tu San Valentín! Dijo "No" ${noCount} veces antes de aceptar.`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error enviando el correo:", error);
            return res.json({ success: false, error: error.message });
        }
        console.log("Correo enviado: " + info.response);
        res.json({ success: true });
    });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});
