import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const workSchema = new Schema(
  {
    program: {
        type: Schema.Types.ObjectId,
        ref: "Program"
    },
    workers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    work: {},
    comment: String,
    backlog: [
        {
            type: Schema.Types.ObjectId,
            ref: "Backlog"
        }
    ],
    startDate: Date,
    endDate: Date
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

workSchema.plugin(timezone)
export default model("Work", workSchema);