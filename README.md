# WorkoutsWeb

## [See the App!](https://workouts-web.netlify.app)

## Description

**-** **WorkoutWeb** es una app que permite entrenar desde cualquier dispositivo, mediante el uso de rutinas de difetentes disciplinas del fitness. Por una parte, el coach "trainer" tiene la posibilidad de crear ejercicios únicos "Workouts". Con estos "Workouts" el coach podrá crear rutinas de trabajo, que se compondrán de todos los "Workouts" que estime oportuno.
Finalmente el usuario registrado recibe la posibilidad de añadir cualquiera de estas rutinas a su perfil de usuario, y entrenar con ellas con la función Trainer Mode.
#### [Client Repo here](https://github.com/FelixFS3D/client-workoutweb)
#### [Server Repo here](https://github.com/FelixFS3D/server-workoutweb)

## Technologies & Libraries used

**-** HTML, CSS, Javascript, React, axios, React Context, Material UI, Base UI, Cloudinary.

## Backlog Functionalities

**-** Registro de marcas en la función de usuario mediante gráficos, una vez se haya entrenado cada rutina.

# Client Structure

## User Stories

- **/** - Home. Página principal y llamada a la acción del registro o login si ya estás registrado. 
- **/signup** - SignUp. La página de registro para acceder a la web.
- **/login** - LogIn. La página de acceso a la web.
- **logout** - Funcionalidad de LogOut para salir de nuestra sesión de usuario.
- **/user** - Usuario. Perfil de usuario con el que accedemos a los datos de cada usuario registrado. Aquí podemos ver nuestras rutinas añadidas, ver todas las rutinas creadas por el coach, así como editar nuestro perfil.
- **/routines** - Aquí podemos ver todas las rutinas creadas por el coach, y que dispone el usuario registrado.
- **/workouts** - Aquí podemos ver todos los workouts creados por el coach con los que podrá hacer las rutinas.
- **/user/training** - Aquí podemos comemnzar a entrenar con un crono.
- **error** - Página de error.
- **/*/** - Página de not found.

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                    */|
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | anon only                | Signup                                                        |
| `/login`                  | Login           |                   | anon only                | Login                                                         |
| `/user`                   | User            | User              | user&admin `<Private>`   | User page                                                     |
| `/trainer`                | Trainer         | Trainer           | admin only `<Private>`   | Trainer mode                                                  |
| `/routines`               | Routines        | Routines          | user&admin `<Private>`   | Routines page                                                 |
| `/workouts`               | Workouts        | Workouts          | admin only `<Private>`   | Workouts page                                                 |
| `/user/training`          | Training Mode   | Training          | user&admin `<Private>`   | Training mode                                                 |

## Other Components

- Navbar

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - workouts.details(id)
  - workouts.add(id)
  - workouts.update(id)
  - workouts.delete(id)

  - routines.details(id)
  - routines.add(id)
  - routines.update(id)
  - routines.delete(id)

  - user.add(id)
  - user.update(id)
  
  
## Context

- auth.context
- user.context
  
## Links

### Collaborators

[Félix](https://github.com/FelixFS3D)

[Iñigo](https://github.com/inigoestebangomez)

### Project

[Repository Link Client](https://github.com/FelixFS3D/client-workoutweb)

[Repository Link Server](https://github.com/FelixFS3D/server-workoutweb)

[Deploy Link](https://workouts-web.netlify.app)

### Excalidraw

[Link to your Excalidraw board](https://excalidraw.com/#json=6WDynWOc1NO4FPiOrs5VM,RxU0Gg6FjFJbFfXA94u3AQ)

### Slides

[Slides Link](https://www.canva.com/design/DAGOArjprrc/Vnvefijgk1MHd5y2YZSdrg/view?utm_content=DAGOArjprrc&utm_campaign=designshare&utm_medium=link&utm_source=editor)