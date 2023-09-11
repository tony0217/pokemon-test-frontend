# Test Pokemon Frontend

<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/pokemon-23.svg" alt="Imagen" width="300" />
</p>


Este es un proyecto de React con una estructura organizada para facilitar el desarrollo y mantenimiento de tu aplicación. Sigue los siguientes pasos para comenzar:

## Paso 1: Clona el Repositorio

```bash
git clone https://github.com/tony0217/pokemon-test-frontend.git
```
## Paso 2: Instala las Dependencias
Asegúrate de tener Node.js y npm (o yarn) instalados en tu máquina. Luego, ejecuta el siguiente comando para instalar las dependencias:

```
npm install
# o
yarn install
```

## Paso 3: Configuración

Dentro de la carpeta src/config, encontrarás archivos de configuración para diferentes entornos (desarrollo, producción, etc.). Ajusta estos archivos según tus necesidades.

## 🏗️ Estructura del Proyecto
La estructura del proyecto es la siguiente:
```

config/
│   ├── config.env.ts
│   ├── config.prod.ts
│  
src/
│
├──api/
│   ├── ...
├── components/
|   |
│   ├── CreateUser/
│   │   ├── CreateUser.tsx
│   │   └── ...
│   │
│   ├── UserList/
│   │   ├── UserList.tsx
│   │   └── ...
│   │
│   ├── FavoritePokemon/
│   │   ├── FavoritePokemon.tsx
│   │   └── ...
│   │
│   ├── PokemonList/
│   │   ├── PokemonList.tsx
│   │   └── ...
│   │
│   ├── Shared/
│   │   └── ...
├─-lib/
│   ├── ...
|   |
├─-Pages/
│   │   ├──login.tsx
│   │   └── ...
│   |
├── main.tsx
├── App.tsx
└── ...

```
## Paso 4: Inicia la Aplicación
Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```
npm run dev
# o
yarn dev
```

## Stack usado

- <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" alt="Imagen" width="30" heigth="30" /> React 
- <img src="https://cdn.worldvectorlogo.com/logos/material-ui-1.svg" alt="Imagen" width="30" heigth="30" /> Mui
- <img src="https://cdn.worldvectorlogo.com/logos/vitejs.svg" alt="Imagen" width="30" heigth="30" /> Vite

- # Notas
Sito:
 <a target="_blank" href="https://pokemon-test-frontend-mb5cf8bah-tony0217.vercel.app/">Mirar Sito Web </a> 

Endpoints:
 <a target="_blank"  href="https://pokemon-test-backend-production.up.railway.app/">Mirar  Documentacion </a> 
