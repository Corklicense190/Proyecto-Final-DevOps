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
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  contactoEmergencia: {
    type: String
  },
  alergias: {
    type: String
  },
  enfermedades: {
    type: String
  },
  medicamentos: {
    type: String
  },
  ultimaConsulta: {
    type: Date,
    default: Date.now
  },
  motivoConsulta: {
    type: String
  }
});

module.exports = mongoose.model('Paciente', pacienteSchema);
