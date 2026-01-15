# E-commerce Analytics Dashboard

Una plataforma de análisis en tiempo real para ventas de e-commerce con predicciones ML, visualización de datos y métricas en vivo.

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 18+
- npm
- Acceso a Internet (para GCP BigQuery)

### Pasos para Ejecutar

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/domdv5/Dashborad-ecommerce.git
   cd Dashborad-ecommerce
   ```

2. **Configurar variables de entorno - Backend**
   
   Crea un archivo `.env` en la carpeta `backend/` con el siguiente contenido:
   
   ```env
   GCP_PROJECT_ID=project-e757136e-5b64-48d0-abf
   BIGQUERY_DATASET=ecommerce_analytics
   BIGQUERY_SALES_TABLE=sales
   BIGQUERY_LOCATION=US
   GCP_KEY_FILE=./secrets/project-e757136e-5b64-48d0-abf-8e4e119a0c91.json
   ```
   
   ⚠️ **IMPORTANTE**: En `GCP_KEY_FILE` debes especificar la ruta al archivo JSON de credenciales de Google Cloud que recibirás por correo. Coloca ese archivo en la carpeta `backend/secrets/` y asegúrate de que la ruta en la variable sea correcta.


3. **Configurar variables de entorno - Frontend**
   
   Crea un archivo `.env.development` en la carpeta `frontend/` con el siguiente contenido:
   
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   VITE_SOCKET_URL=http://localhost:3000
   ```
   


4. **Instalar dependencias del backend**
   ```bash
   cd backend
   npm install
   cd ..
   ```

5. **Instalar dependencias del frontend**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

6. **Iniciar el backend** (en una terminal)
   ```bash
   cd backend
   npm run start:dev
   ```

7. **Iniciar el frontend** (en otra terminal)
   ```bash
   cd frontend
   npm run dev
   ```

8. **Abrir en navegador**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📊 Arquitectura de Datos - BigQuery

### Estrategia de Particionamiento

El dataset en BigQuery está **particionado por fecha** (`timestamp`) en la tabla `sales`:

**Justificación:**
La tabla de **sales** fue particionada por el campo timestamp con el objetivo de optimizar las consultas basadas en rangos de tiempo, que es el patrón más recurrente según los requerimientos de la prueba.

Este tipo de particionamiento permite que, al ejecutar una consulta SQL filtrada por fechas, BigQuery evite escanear la tabla completa (full table scan), reduciendo significativamente la cantidad de datos leídos. Como resultado, se mejora el rendimiento de las consultas y se disminuyen los costos, ya que BigQuery cobra en función de los bytes procesados.

### Estrategia de Clustering

Adicionalmente, se aplicó clustering por category y region, ya que estos campos son frecuentemente utilizados en agregaciones y filtros analíticos (por ejemplo, ventas por categoría). Esta combinación mejora la eficiencia de las consultas agregadas y es consistente con el tipo de dashboard analítico que consume la información desde el frontend.

### Datos Disponibles

Los datos ingestionados en BigQuery corresponden al **período completo del año 2023**. Al iniciar la aplicación, se mostrará el historial de ventas por categoría para la totalidad del año 2023. Es posible seleccionar un rango de tiempo diferente dentro del mismo año 2023 usando el selector de fechas disponible en el dashboard.


## 🔐 Nota Importante sobre Seguridad

🔑 Configuración de Google Cloud (BigQuery)

Para esta prueba técnica, se ha implementado una integración real con Google BigQuery. 

**Aclaración sobre el enfoque de seguridad:**

Soy completamente consciente de que en un entorno productivo, el enfoque actual **no sería la mejor práctica**. En producción, las credenciales de Google Cloud deberían:
- Almacenarse en variables de entorno del servidor (no en archivos locales)
- Gestionarse a través de un gestor de secretos (ej: HashiCorp Vault, AWS Secrets Manager, Google Secret Manager)
- Nunca compartirse vía correo electrónico ni incluirse en el repositorio

**Decisión para esta evaluación:**

Sin embargo, se implementó de esta manera específicamente para **facilitar la revisión de la prueba técnica**, permitiendo que puedas:
- Ejecutar la aplicación inmediatamente sin configuraciones adicionales complejas
- Evaluar la funcionalidad completa sin barreras técnicas
- Enfocarte en la calidad del código, arquitectura y lógica de negocio

**Cómo configurarlo:**

1. Descargue el archivo JSON de credenciales adjunto en el correo de entrega
2. Guárdelo en la carpeta `/backend/secrets/`
3. Asegúrese de que su archivo `.env` tenga la ruta correcta: `GCP_KEY_FILE=./secrets/google-key.json`
4. En un proyecto real, recomendaría usar variables de entorno del servidor o un gestor de secretos




## 🎓 Tecnologías Utilizadas

- **Frontend**: Vue 3, TypeScript, Pinia, Chart.js, Socket.IO
- **Backend**: NestJS, TypeScript, BigQuery SDK
- **Database**: Google BigQuery (Cloud SQL alternative)
- **ML**: BigQuery ML (ARIMA_PLUS)

### 🏗️ ¿Por qué NestJS para el Backend?

Se eligió NestJS para el backend por su modularidad, que permite organizar funcionalidades en módulos independientes, y por su estructura clara (controllers, services, modules) que facilita mantenimiento y navegación del código.
Al estar basado en TypeScript, ofrece tipado fuerte, autocompletado y detección de errores. Su inyección de dependencias permite componentes desacoplados y testables, y su soporte nativo de WebSocket facilita la comunicación en tiempo real. Además, cuenta con un ecosistema robusto para integración con servicios externos y herramientas de validación y middleware que mejoran la calidad del código.


## 🤖 Uso de Herramientas de IA

Utilicé inteligencia artificial como herramienta de apoyo en varios aspectos del proyecto, siempre con revisión crítica del código generado. Modelos utilizados: Claude y ChatGPT, aprovechando las versiones Pro gratuitas que ofrecen las plataformas, así como sus versiones estándar sin costo.

- **Script de carga de datos**: Para generar los 10,000 registros de ventas y estructurar la inserción en BigQuery
- **BigQuery**: Para entender particionamiento, clustering y consultas optimizadas
- **Vue 3**: Para adaptarme al desarrollo en Vue viniendo de experiencia en React, usando IA como guía para entender patrones y buenas prácticas en la estructura de la aplicación.
- **Optimización de código**: Para mejorar rendimiento y legibilidad donde fue posible
- **README**: Para estructurar y pulir la documentación, partiendo de mis ideas propias

En todos los casos, el código fue revisado, validado y adaptado a los requerimientos específicos del proyecto. No fue copiar y pegar, sino un proceso de aprendizaje y mejora iterativa.

---

## 🔍 Troubleshooting

**Error de conexión a BigQuery:**
- Verifica conexión a Internet
- Confirma que el proyecto GCP sea accesible públicamente

**Frontend no conecta al backend:**
- Asegúrate que `npm run start:dev` está corriendo en `backend/`
- Verifica que el puerto 3000 no está en uso

**WebSocket desconectado:**
- Recarga la página
- Verifica la consola del navegador para errores de conexión

---

**Autor**: Andrés Calderón  
**Fecha**: 2026
