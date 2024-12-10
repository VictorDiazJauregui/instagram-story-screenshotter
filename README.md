# Instagram Story Screenshotter

Instagram Story Screenshotter es una herramienta que permite scrapear historias de Instagram de las cuentas que se le indiquen, capturándolas y guardándolas de manera local. Utiliza Playwright para la automatización del navegador y la captura de las historias.

## Instalación
Sigue estos pasos para instalar y configurar el proyecto:
1. Clona el repositorio
    ```bash
    git clone https://github.com/aledjv22/instagram-story-screenshotter.git
    cd instagram-story-screenshotter
    ```
2. Instala las dependencias
    ```bash
    npm install
    ```
3. Crea un archivo **.env** en la raíz del proyecto basado en el archivo **.env.example** y completa los datos necesarios:
    ```bash
    cp .env.example .env
    ```
    - **INSTAGRAM_USERNAME**: Nombre de usuario de Instagram.
    - **INSTAGRAM_PASSWORD**: Contraseña de Instagram.
    - **INSTAGRAM_ACCOUNTS**: Las cuentas de Instagram a scrapear en formato JSON.
    **Nota:** Se recomienda usar una cuenta de Instagram que no sea la propia. Puedes crear una cuenta usando correos temporales de [Temp Mail](https://temp-mail.org/es).

## Ejecución
Para ejecutar el proyecto y comenzar a capturar las historias de Instagram, utiliza el siguiente comando:
```bash
npm start
```
Este comando ejecutará las pruebas de Playwright utilizando el navegador Firefox.

## Almacenamiento de Imágenes
Las imágenes capturadas se almacenan en la carpeta **screenshots** con el siguiente formato de nombre:
```
screenshots/{nombre_de_usuario}_{numero_de_historia}_{fecha}.png
```
- **nombre_de_usuario:** El nombre de usuario de la cuenta de Instagram.
- **numero_de_historia:** El número de la historia capturada.
- **fecha:** La fecha en formato DDMMYYYY.

## Colaboraciones
¡Se aceptan colaboraciones! Si deseas contribuir a este proyecto, por favor, abre un issue o envía un pull request. Tu ayuda es bienvenida y apreciada.