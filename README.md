Se hizo la creacion de una API RESTful completa para una gestion de entrenamientos, usuarios, ejercicios y reporte de progreso.

TABLA DE ENDPOINTS
USUARIO (USERS)
METODO - ENDPOINT - DESCRIPCION
GET -  /api/v1/users - Obtener todos los usuarios
GET	- /api/v1/users/:id -	Obtener usuario por ID
POST - /api/v1/users - Crear nuevo usuario
PUT	 - /api/v1/users/:id - Actualizar usuario
DELETE - /api/v1/users/:id - Eliminar usuario

EJERCICIOS (EXERCISES)
METODO - ENDPOINT - DESCRIPCION
GET - /api/v1/exercises - Obtener todos los ejercicios
GET - /api/v1/exercises/categories - Obtener categorías
GET - /api/v1/exercises/:id	 - Obtener  ejercicio por ID
POST - /api/v1/exercises  - Crear nuevo ejercicio
PUT - /api/v1/exercises/:id - Actualizar  ejercicio
DELETE - /api/v1/exercises/:id - Eliminar  ejercicio

PLANES DE ENTRENAMIENTO (WORKOUTPLANS)
METODO - ENDPOINT - DESCRIPCION 
GET - /api/v1/workoutPlans - Obtener todos los planes
GET - /api/v1/workoutPlans/:id - Obtener plan por ID
POST - /api/v1/workoutPlans - Crear nuevo plan
PUT - /api/v1/workoutPlans/:id - Actualizar plan completo
PATCH - /api/v1/workoutPlans/:id - Actualización parcial
DELETE - /api/v1/workoutPlans/:id - Eliminar plan

Ejercicios en Planes (WORKOUTEXERCISES)
METODO - ENDPOINT - DESCRIPCION
GET - /api/v1/workoutExercises - Obtener ejercicios de planes
GET - /api/v1/workoutExercises/:id - Obtener ejercicio por ID
POST - /api/v1/workoutExercises - Agregar ejercicio a plan
PUT - /api/v1/workoutExercises/:id - Actualizar ejercicio completo
PATCH - /api/v1/workoutExercises/:id - Actualización parcial
DELETE - /api/v1/workoutExercises/:id - Eliminar ejercicio de plan

HORARIOS DE ENTRENAMIENTO (workoutSchedule)
METODO - ENDPOINT - DESCRIPCION
GET - /api/v1/workoutSchedules - Obtener todos los horarios
GET - /api/v1/workoutSchedules/user/:userId - Horarios por usuario
GET - /api/v1/workoutSchedules/:id - Obtener horario por ID
POST - /api/v1/workoutSchedules - Crear nuevo horario
PUT - /api/v1/workoutSchedules/:id - Actualizar horario completo
PATCH - /api/v1/workoutSchedules/:id - Actualización parcial
DELETE - /api/v1/workoutSchedules/:id - Eliminar horario

REPORTE DE PROGRESO (WORKOUTREPORT)
METODO - ENDPOINT - DESCRIPCION
GET - /api/v1/workoutReports - Obtener todos los reportes
GET - /api/v1/workoutReports/user/:userId - Reportes por usuario
GET - /api/v1/workoutReports/:id - Obtener reporte por ID
POST - /api/v1/workoutReports - Crear nuevo reporte
DELETE - /api/v1/workoutReports/:id - Eliminar reporte



EJEMPLOS DE REQUEST/REPONSE Y ESTADOS HTTP
USUARIOS
crear usuario:
POST /api/v1/users
{
  "name": "Ana López",
  "email": "ana@example.com",
  "role": "user"
} Reponse:201 created
Json: 
{
  "result": {
    "id": "1737735600000-abc123def",
    "name": "Ana López",
    "email": "ana@example.com",
    "role": "user",
    "createdAt": "2024-01-24T10:30:00.000Z"
  }
}
Obtener todos los usuarios
request: /api/v1/users
reponse: 200 OK
{
  "result": [
  {
      "id": "1",
      "name": "Carlos Navia",
      "email": "carlos@example.com",
      "role": "user",
      "createdAt": "2025-09-12T12:00:00.000Z"
      }
      
  ]
}
Respuestas exitosas:
{
"result": { ... } // Para operaciones simples
}
{
"result": [ ... ] // para listas
}
{
"result": {
"message": "...",
"deletedItem": { ... } 
}
}

RESPUESTAS DE ERROR
{
"error": "Mensaje descriptivo del error"
}

ESTADOS HTTP APLICADOS 
CODIGO - ESTADO - CASOS DE USO
200	- OK	- Consultas exitosas (GET), actualizaciones (PUT/PATCH), eliminaciones (DELETE)
201 - Created	- Recursos creados exitosamente (POST)
400 - Bad Request	- Validaciones fallidas, datos incorrectos
404 - Not Found	- Recursos no encontrados
500	 - Internal Server Error - Errores del servidor
