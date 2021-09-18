import { Schema, model } from "mongoose";
import timezone from 'mongoose-timezone'

const helpSchema = new Schema(
  {
    listPrevAA: [],
    listPrevPres: [],
    listPrevAAM: [],
    listPrevCV: [],
    listPrevChil: [],
    listInspAA: [],
    listInspPres: [],
    listInspAAM: [],
    listInspCV: [],
    listInspChil: [],
    listFailAA: [],
    listFailPres: [],
    listFailAAM: [],
    listFailCV: [],
    listFailChil: [],
    listCorrAA: [],
    listCorrPres: [],
    listCorrAAM: [],
    listCorrCV: [],
    listCorrChil: []
  },
  {
    versionKey: false,
  }
);

helpSchema.plugin(timezone)
export default model("Help", helpSchema);
