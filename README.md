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
- **error** - Página de error,
- **/*/** - As a user I want to create an event so that I can invite others to attend

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      */|
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            |                   | public                   | Home page                                                     |
| `/signup`                 | Signup          |                   | anon only `<IsAnon>`     | Signup form, link to login, navigate to homepage after signup |
| `/login`                  | Login           |                   | anon only `<IsAnon>`     | Login form, link to signup, navigate to homepage after login  |
| `/profile`                | Profile         | EditProfile       | user only `<IsPrivate>`  | Navigate to homepage after logout, expire session             |
| `/games/list`             | GameList        | AddGame, GameCard | user only `<IsPrivate>`  | Shows all films on backlog                                    |
| `/games/edit`             | GamesEdit       |                   | user only `<IsPrivate>`  | Shows all games on backlog                                    |
| `/games/favourites`       | FavouriteList   | GameCard          | user only `<IsPrivate>`  | Shows all games on backlog                                    |

## Other Components

- Navbar
- Footer

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - game.filter(type, status)
  - game.detail(id)
  - game.add(id)
  - game.delete(id)
  - game.update(id)
  
- External API
  - gameApi.details
  - gameApi.list
  
## Context

- auth.context
- theme.context
  
## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)