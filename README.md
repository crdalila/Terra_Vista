# Terra_Vista

## Instrucciones básicas de GitHub:

## 1. Clonar el repositorio

```bash
git clone https://github.com/crdalila/Terra_Vista.git
cd nombre-del-repositorio
```

---

## 2. Crear una nueva rama de desarrollo

Crea tu rama **a partir de tu vertical** (ej: `fullstack`, `data`, `ciber`):

```bash
# Asegúrate de tener la rama base actualizada, todos los días haz:
git checkout data
git pull origin data

# Crea una nueva rama de feature
git checkout -b feature/data/name
```

---

## 3. Guardar tus cambios

```bash
# Añadir los archivos modificados
git add .

# Hacer un commit con un mensaje claro
git commit -m "remember to write this comment in english"

# Que tu rama local se suba a GitHub
git push
```


## 4. Crear un Pull Request (PR)

Como las ramas principales están protegidas, cuando quieras unir tu código a alguna de ellas no puedes hacerlo con un simple push. Tienes que hacer un pull request.

1. Ve a GitHub.
2. Entre las opciones del navbar habrá una llamada Pull requests (entre Issues y Actions)
3. Elige como base tu vertical (`fullstack`, `ciber`, `data`).
4. Añade una descripción clara de lo que hiciste.
5. Un compi va a tener que revisar los cambios y aceptarlos, asegurándose de que no entre en conflicto el código que ya había en esa rama principal.

---

## 🔧 Convenciones de nombres para ramas

Ramas principales (protegidas):
```
main (para el cliente final)
dev (rama para juntar todas las verticales cuando llegue el momento)
fullstack (principal de fullstack)
ciber (principal de ciber)
data (principal de data)
```

A partir de las ramas principales de cada vertical, crear nuevas ramas con esta estructura:
```
feature/<vertical>/<name>
hotfix/<vertical>/<urgencie>
```

Ejemplos:

* `feature/data/etl-csv-parser`
* `hotfix/fullstack/login-500-error`

---

## 📚 Recursos

* [Guía básica de Git (Pro Git Book)](https://git-scm.com/book/es/v2)
* [GitHub Docs](https://docs.github.com/es)
* Pregunta a FullStack si tienes alguna duda <3

---

**Gracias**

