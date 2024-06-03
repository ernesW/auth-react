# Trabajo Final Programacion
Mi proyecto final trata de uun SignUp y LogIn para usuarios en el que he usuado MongooDB, REACT, VITE y unas librerias aparte, para esto he usado componentes de react rutas protegidas, API y tokens de usuario que se guardan en local. Tambien lo que he implementado ha sido una pequena lista de tareas o recordatorio de tareas. 

A medida de que he ido haciendo han ido saliendo errores que he podido ir arreglando, uno de los que mas me ha costado arreglar era la implementacion de el refreshToken porque se perdia en cuanto iniciaba sesion y si refrescaba la pestana se volvia al login pero lo he podido arreglar

Aun asi voy a seguir trabajando en el por mi cuenta y actualizando poco a poco el modelo mejorande errores que surgan y aniandiendo nuevas funcionalidades y mas...

Me he ido guiando gracias a videos de YouTube y algunos repos de GitHub, he aprendido muchos conceptos nuevos al crear este proyecto aunque es dificil acordarse de todo a la perfeccion siento que este trabajo me ha sido muy util a la hora del aprendizaje orientado a la WEB

# Inizializar el proyecto

1- Abrimos dos terminales y nos metemos a la carpeta del proyecto

2- En una de ellas a auth-back y en la otra a auth-front

3- En auth-back escribimos en la terminal: node .\app.js para conectarnos a la base de datos...

4- En auth-fornt deberia ser: npm run dev ,pero si nos diera algun error seguramente nos pida instalar vite ya que se pierde al descargarlo del gitHub hariamos entonces: npm install vite

5- Accedemos al enlace que nos da la parte del front y ya estariamos ante el proyecto


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
