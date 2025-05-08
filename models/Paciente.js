// models/Paciente.js

const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  curp: {
    type: String,
    required: true
    // ⚠️ Este campo lo puedes encriptar antes de guardar
  },
  direccion: {
    type: String,
    required: true
    // Encriptable
  },
  telefono: {
    type: String,
    required: true
    // Encriptable
  },
  contactoEmergencia: {
    type: String
    // Encriptable
  },
  alergias: {
    type: String
    // Encriptable
  },
  enfermedades: {
    type: String
    // Encriptable
  },
  medicamentos: {
    type: String
    // Encriptable
  },
  ultimaConsulta: {
    type: Date,
    default: Date.now
  },
  motivoConsulta: {
    type: String
    // Encriptable
  }
});

module.exports = mongoose.model('Paciente', pacienteSchema);
