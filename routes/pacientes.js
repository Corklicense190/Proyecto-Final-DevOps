// routes/pacientes.js

const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const CryptoJS = require('crypto-js');
require('dotenv').config();

function encrypt(value) {
  return CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
}

// Ruta para registrar un nuevo paciente
router.post('/', async (req, res) => {
  try {
    const {
      nombre,
      fechaNacimiento,
      curp,
      direccion,
      telefono,
      contactoEmergencia,
      alergias,
      enfermedades,
      medicamentos,
      ultimaConsulta,
      motivoConsulta
    } = req.body;

    const nuevoPaciente = new Paciente({
      nombre,
      fechaNacimiento,
      curp: encrypt(curp),
      direccion: encrypt(direccion),
      telefono: encrypt(telefono),
      contactoEmergencia: encrypt(contactoEmergencia),
      alergias: encrypt(alergias),
      enfermedades: encrypt(enfermedades),
      medicamentos: encrypt(medicamentos),
      ultimaConsulta,
      motivoConsulta: encrypt(motivoConsulta)
    });

    await nuevoPaciente.save();
    res.status(201).json({ mensaje: 'Paciente registrado con éxito (encriptado)' });
  } catch (error) {
    console.error('Error al guardar paciente:', error);
    res.status(500).json({ mensaje: 'Error al registrar paciente' });
  }
});

// Desencriptar función
function decrypt(value) {
  const bytes = CryptoJS.AES.decrypt(value, process.env.SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

// Ruta para obtener todos los pacientes desencriptando campos
router.get('/', async (req, res) => {
  try {
    const pacientes = await Paciente.find();

    const pacientesDesencriptados = pacientes.map(p => ({
      nombre: p.nombre,
      fechaNacimiento: p.fechaNacimiento,
      curp: decrypt(p.curp),
      direccion: decrypt(p.direccion),
      telefono: decrypt(p.telefono),
      contactoEmergencia: decrypt(p.contactoEmergencia),
      alergias: decrypt(p.alergias),
      enfermedades: decrypt(p.enfermedades),
      medicamentos: decrypt(p.medicamentos),
      ultimaConsulta: p.ultimaConsulta,
      motivoConsulta: decrypt(p.motivoConsulta),
      _id: p._id
    }));

    res.json(pacientesDesencriptados);
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    res.status(500).json({ mensaje: 'Error al obtener pacientes' });
  }
});

module.exports = router;