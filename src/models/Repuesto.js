import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const repuestoSchema = new Schema(
  {
    equipos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Equipo"
        }
    ],
    name: String,
    model: String,
    part_number: String
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

repuestoSchema.plugin(timezone)
export default model("Repuesto", repuestoSchema);
