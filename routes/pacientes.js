// routes/pacientes.js

const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');

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
      curp,
      direccion,
      telefono,
      contactoEmergencia,
      alergias,
      enfermedades,
      medicamentos,
      ultimaConsulta,
      motivoConsulta
    });

    await nuevoPaciente.save();
    res.status(201).json({ mensaje: 'Paciente registrado con éxito' });
  } catch (error) {
    console.error('Error al guardar paciente:', error);
    res.status(500).json({ mensaje: 'Error al registrar paciente' });
  }
});

module.exports = router;
