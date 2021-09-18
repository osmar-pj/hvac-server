import { Router } from "express";
const router = Router();

import * as programCtrl from "../controllers/program.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken, authJwt.isModerator], programCtrl.createProgram)

router.get('/', [authJwt.verifyToken], programCtrl.getPrograms)

// router.put('/:id', [authJwt.verifyToken, authJwt.isAdmin], equipoCtrl.updateWorker)

export default router;
