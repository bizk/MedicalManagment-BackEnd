# MedicalManagment-BackEnd
This is the backend of the react native project of a medical managment application running on NodeJS with Sequelize.

## Endpoints
Since we will run this project over local this app will run over `localhost:8080` but it will change in case it is deployed over production.

Usamos el formato : `URLEncoded from data`

###Usuarios
**Registrar usuario**
> POST: /users/registerUser 

Consume en el body
- mail
- password

**Logear usuario**
> POST: /users/loginUser

Consume en el body:
- mail
- password

------------


###Personas
Una persona es un modelo general del cual puede tener el rol de paciente o de medico

**Crear persona**
> POST: /people/createPeople

Consume los datos del body:
- userUUID
- name
- sureName
- dateOfBirth
- dni

**Obtener a todas las personas**
> GET: /people/getAll

Nos devuelve en formato JSON a todos los usuarios

**Obtener todos los medicos**
> GET: /people/getAllMedics

Nos devuelve en formato JSON a todas las personas con rol 'MEDICO'


------------


###Roles

Un rol es lo que una persona tiene por ser medico o paciente

**Crear rol**
> POST: /role/createRole

Consume:
- role


**Obtener todos los roles existentes**
> GET: /role/getAll

------------


###Especialidad
Una especialidad es un modelo que tiene un medico o un turno

**Crear especialidad**
> POST: /speciality/createSpeciality

Body: type

**Obtener un medico de una especialidad**
> GET: /speciality/getSpeciality

Body: Speciality
Nos devuelve todos los medicos de una determinada especialidad

**Obtener todos los medicos de cada especialidad**
> GET: /speciality/getAll

Body: speciality


------------

### Turnos

**Crear turno**
> POST: /booking/createBooking

Nos permite agendar un turno con un medico, un paciente en una fecha (siempre cumpliedno con las restricciones)
Body:
- patientId (Id del paciente)
- medicId (Id del medico)
- specialityId (id de la especialdiad)
- day (dia de la consulta)
- time_start (hora de inicio del turno)
- time_end (Hora de fin de turno)

**Confirmar booking**
> PUT: /booking/confirmBooking

Body: bookingId (id del turno que queremos confirmar)
Confirma el turno y lo setea siempre y cuando cumpla con las restrcciones

**Cancelar turno por parte de paciente**
> PUT: /booking/cancelBooking

Body: bookingId (id del turno que seleccionamos)
Devuelve un mensaje en caso de estar antes de las 12 hs

**Cancelar turno por parte del centro medico**
> PUT: /booking/cancelBookingByMedicCentre

Body: bookingId (id del turno que seleccionamos)

**Obtener todos los turnos**
> GET: /booking/getAll
