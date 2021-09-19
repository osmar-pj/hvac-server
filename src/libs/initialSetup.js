import Role from "../models/Role"
import User from "../models/User"
import Equipo from "../models/Equipo"

import bcrypt from "bcryptjs"
import Help from "../models/Help"
import equipos from './BD.json'

export const createEquipo = async () => {
  try {
    const count = await Equipo.estimatedDocumentCount()
    if(count > 0) return
    equipos.forEach(async (equipo) => {await new Equipo(equipo).save()})
    console.log('Equipos guardados')
  } catch (error) {
    console.error(error)
  }
}

export const createHelp = async () => {
  try {
    const count = await Help.estimatedDocumentCount()
    if(count > 0) return
    const listPrevAA = [
      'Lavado de serpentines',
      'Reajuste de cableado electrico fuerza y control',
      'Cambio componentes electricos',
      'Cambio componentes mecanicos',
      'Limpieza de tablero electrico',
      'Lubricacion de bocinas o rodamiento de motores',
      'Cambio o limpieza de filtros',
      'Limpieza de unidad condensadora',
      'Limpieza de unidad evaporadora',
      'Limpieza de bornes de contactores',
      'Peinado de serpentin',
      'Resane con cintas de aluminio',
      'Resane de case de equipo A/A con pintura epoxica',
      'Limpieza de rejillas de suministro y retorno',
      'Alineamiento o cambio de faja de transmision',
      'Verificacion de funcionalidad de termostato',
      'Instalacion de gomas en tablero electrico',
      'Guardas de proteccion en buenas condiciones',
    ]
    const listPrevPres = [
      'Limpieza o cambio de filtros',
      'Limpieza de unidad compresora',
      'Limpieza de gabinete de pulverizacion',
      'Limpieza de rejillas de suministro',
      'Limpieza de tablero electrico',
      'Verificacion de funcionamiento de variadores',
      'Verificacion de funcionamiento de valvulas de limpieza',
      'Limpieza de mangueras y unidad de purificacion',
      'Cambio de aceite de compresor',
      'Alineamiento o cambio de faja de transmision',
      'Resjuste de cableado electrico fuerza y control',
      'Resane con cintas de aluminio',
      'Resane de case de equipo A/A con pintura epoxica',
      'Instalacion de gomas en tablero electrico',
      'Guardas de proteccion en buenas condiciones'
    ]
    const listPrevAAM = [
      'Limpieza de mangueras',
      'Limpieza de rejillas de suministro',
      'Limpieza de motor inyector de aire a la cabina',
      'Verificacion de valvulas de presion alta y baja',
      'Cambio de fajas de compresor',
      'Cambio de harness de componentes',
      'Limpieza o cambio de filtros de aire',
      'Hermetizado de cabina',
      'Limpieza de cabina',
      'Instalacion de gomas en tablero electrico'
    ]
    const listPrevCV = [
      'Limpieza o cambio de filtros de aire',
      'Limpieza de equipo y gabinete',
      'Lubricacion de bocinas de motor ventilador',
      'Verificacion de funcionamiento',
      'Ausencia de ruidos de rozamiento',
      'Limpieza de sistema electrico fuerza y control',
      'Limpieza de borneras',
      'Cables en buenas condiciones',
      'Instalacion de gomas en tablero electrico'
    ]
    const listInspAA = [
      'Ausencia de golpes u oxido en gabinete',
      'Ausencia de rozamiento en el serpentin',
      'Setpoint de termostato se mantiene',
      'Ausencia de ruidos en motor condensador',
      'Ausencia de ruidos en motor evaporador',
      'Rotulados en buenas condiciones',
      'Sistemas funcionan de forma normal',
      'Cableado estructurado sin observaciones',
      'Suministro de aire frio funciona correctamente',
      'Ausencia de fugas de refrigerante'
    ]
    const listInspPres = [
      'Suministro de aire es normal',
      'Cableado estructurado sin observaciones',
      'Ausencia de golpes u oxido en gabinete',
      'Variador de frecuencia funciona manual y automatico',
      'Rotulados en buenas condiciones',
      'Mangueras de aire a presion en buenas condiciones',
      'Guardas de proteccion en buenas condiciones',
      'Valvulas de autolimpieza funcionando'
    ]
    const listInspAAM = [
      'Suministro de aire frio funciona correctamente',
      'Suministro de aire caliente funciona correctamente',
      'Valvulas de paso para frio/calor sin observaciones',
      'Harness electrico sin observaciones',
      'Valvulas de presion alta y baja sin observaciones',
      'Ausencia de ruidos en motor ventilador',
      'Ausencia de fugas de refrigerante',
      'Rotulados en buenas condiciones'
    ]
    const listInspCV = [
      'Ausencia de golpes u oxido en gabinete',
      'Ausencia de ruidos en motor ventiador',
      'Suministro normal de flujo de aire',
      'Rotulados en buenas condiciones',
      'Guardas de proteccion en buenas condiciones',
      'Cableado estructurado sin observaciones'
    ]
    const listFailAA = [
      'Falla motor compresor',
      'Fuga de refrigerante',
      'Falla de motor condensador',
      'Falla de motor evaporador',
      'Falla de componente electrico del tablero',
      'Falla de termostato',
      'Falla de componente mecanico',
      'Saturacion de filtrado de aire',
      'Rotura de faja de transmision',
      'Falla de la valvula de expansion'
    ]
    const listFailPres = [
      'Falla de motor inyector de aire',
      'Falla de diferencial de presion',
      'Falla de variador de frecuencia',
      'Falla de componentes electrico del tablero',
      'Falla de motor compresor de aire',
      'Falla de valvula de autolimpieza',
      'Falla de unidad de mantenimiento RLF',
      'Rotura de faja de transmision'
    ]
    const listFailAAM = [
      'Fuga de refrigerante',
      'Rotura de faja de transmision',
      'Falla de motor ventilador',
      'Mangueras rotas',
      'Falla de compresor',
      'Rotura de harness',
      'Saturacion de filtro de aire',
      'Falla de fusible de componentes electricos',
      'Falla de componentes mecanicos'
    ]
    const listFailCV = [
      'Falla de motor ventilador',
      'Falla de componente electrico',
      'Falla de componente mecanico'
    ]
    const newHelp = new Help({
        listPrevAA,
        listPrevPres,
        listPrevAAM,
        listPrevCV,
        listInspAA,
        listInspPres,
        listInspAAM,
        listInspCV,
        listFailAA,
        listFailPres,
        listFailAAM,
        listFailCV
    })
    await newHelp.save()
  } catch (error) {
    console.error(error)
  }
}

export const createRoles = async () => {
  try {
    // Count Documents
    const count = await Role.estimatedDocumentCount();

    // check for existing roles
    if (count > 0) return;

    // Create default Roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "visit" }).save(),
    ]);
    console.log(values);
    
    // create Admin
    const user = await User.findOne({ email: "admin@winex.com" });
    // get roles _id
    const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

    if (!user) {
      // create a new admin user
      await User.create({
        name: "Admin",
        lastname: '',
        dni: "42886899",
        cargo: "Developer",
        valid: true,
        password: await bcrypt.hash("admin123", 10),
        roles: roles.map((role) => role._id),
      });
      console.log('Admin User Created!')
    }

    
  } catch (error) {
    console.error(error);
  }
}