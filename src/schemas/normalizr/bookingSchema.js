import { schema } from 'normalizr'

const studentSchema = new schema.Entity('student')
const teacherSchema = new schema.Entity('teacher')

const classMasterSchema = new schema.Entity('class_master')
const actvitiesSchema = new schema.Entity('activities')
const classSchema = new schema.Entity('class', {
  class_master: classMasterSchema,
  activities: [actvitiesSchema]
})

const slotsScehma = new schema.Entity('slot')
const bookingSchema = new schema.Entity('booking', {
  teacher: teacherSchema,
  student: studentSchema,
  slot: slotsScehma,
  class: classSchema
})

export { bookingSchema }
