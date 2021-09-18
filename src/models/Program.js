import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const programSchema = new Schema(
  {
    equipo: {
        type: Schema.Types.ObjectId,
        ref: "Equipo"
    },
    barList: [],
    status: {
      type: Boolean,
      default: false
    },
    type_work: String,
    work: {
        type: Schema.Types.ObjectId,
        ref: "Work"
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

programSchema.plugin(timezone)
export default model("Program", programSchema);
