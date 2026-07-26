# UFC Zone

Spring Boot fighter API with a responsive React + Vite roster dashboard.

## Run locally

Start the backend:

```bash
./mvnw spring-boot:run
```

In a second terminal, start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the Spring server at
`http://localhost:8080`.

## Configuration

- Set `VITE_API_URL` when the frontend should call a deployed API directly.
- Set `app.cors.allowed-origins` on the backend to allow a deployed frontend origin.
