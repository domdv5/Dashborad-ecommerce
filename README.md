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


## 🔐 Nota Importante sobre Seguridad

🔑 Configuración de Google Cloud (BigQuery)

Para esta prueba técnica, se ha implementado una integración real con Google BigQuery. Se ha optado por el siguiente esquema para facilitar la evaluación sin comprometer la seguridad:

Seguridad: El archivo JSON de la llave de acceso no está incluido en el repositorio.

Acceso: He adjuntado el archivo de credenciales (google-key.json) en el correo de entrega.

Configuración Instantánea:

Descargue el archivo JSON adjunto del correo.

Guárdelo directamente en la carpeta /backend/secrets/

Asegúrese de que su archivo .env tenga la ruta correcta: GCP_KEY_FILE=./secrets/google-key.json.




## 🎓 Tecnologías Utilizadas

- **Frontend**: Vue 3, TypeScript, Pinia, Chart.js, Socket.IO
- **Backend**: NestJS, TypeScript, BigQuery SDK
- **Database**: Google BigQuery (Cloud SQL alternative)
- **ML**: BigQuery ML (ARIMA_PLUS)


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
