import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const backlogSchema = new Schema(
  {
    repuesto: {
        type: Schema.Types.ObjectId,
        ref: "Repuesto"
    },
    cantidad: Number,
    critic: String,
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

backlogSchema.plugin(timezone)
export default model("Backlog", backlogSchema);
