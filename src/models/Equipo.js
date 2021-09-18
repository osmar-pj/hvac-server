import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const equipoSchema = new Schema(
  {
    tag: String,
    marca: String,
    tipo: String,
    capacidad: Number,
    unidad: String,
    modelo: String,
    serie: String,
    equipo: String,
    ubicacion: String,
    area: String,
    image: String,
    components: {},
    status: {
      type: String,
      default: "operativo"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

equipoSchema.plugin(timezone)
export default model("Equipo", equipoSchema);
