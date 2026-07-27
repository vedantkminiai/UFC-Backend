# UFC Zone

UFC Zone is a full-stack fighter intelligence platform for exploring UFC athlete
records and performance statistics. It combines a Python data-collection pipeline,
a PostgreSQL database, a Spring Boot REST API, and a responsive React dashboard.

The application makes it easy to retrieve fighter data, search and filter the
roster, manage fighter records, inspect detailed performance metrics, and compare
the top-ranked athletes in every major statistical category.

## Features

### Fighter roster

- Retrieve the complete fighter dataset from the Spring Boot API
- Search fighters by the beginning of their name
- Filter the visible roster by weight and stance
- Open detailed fighter profiles with physical, striking, and grappling statistics
- Add new fighters directly from the React interface
- Edit existing fighter information
- Remove fighters from the database

### Statistic leaders

The Leaders page calculates and displays the top 10 fighters for each supported
category:

- Career wins and losses
- Career win rate
- Significant strikes landed per minute
- Significant strikes absorbed per minute
- Striking accuracy and defense
- Takedown average, accuracy, and defense
- Submission average
- Reach

Each ranked fighter can be selected to open their complete profile without leaving
the leaderboard.

### Responsive interface

- Fight-night visual design inspired by professional combat sports broadcasts
- Responsive roster cards, filtering controls, profile panels, and ranking tables
- Loading, empty, and backend-error states
- Mobile navigation and layouts for phones, tablets, and desktops

## Technology stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, JavaScript, CSS, Lucide React |
| Backend | Java, Spring Boot, Spring Web MVC, Spring Data JPA |
| Database | PostgreSQL |
| Data collection | Python, Requests, BeautifulSoup |
| Testing | JUnit, Spring Boot Test, H2 |
| Build tools | Maven, npm |

> **Scraper note:** The scraper currently checked into this repository uses
> Requests and BeautifulSoup for HTML retrieval and parsing. It does not currently
> use Selenium. Selenium can be introduced later if browser-driven scraping is
> required for dynamically rendered pages.

## Data pipeline

```text
UFC Stats website
        ↓
Python scraper
        ↓
CSV fighter dataset
        ↓
PostgreSQL player_statistic table
        ↓
Spring Boot REST API
        ↓
React roster and leaderboards
```

The Python scraper visits the UFC Stats fighter index and each fighter's detail
page. It extracts identity, record, physical measurements, striking statistics,
takedown statistics, submission averages, and source URLs. The resulting CSV data
can be loaded into the PostgreSQL `player_statistic` table.

Spring Boot retrieves that data through Spring Data JPA and exposes it through the
fighter REST API. React consumes the API and turns the stored records into the
interactive roster, fighter profiles, filters, forms, and statistic rankings.

## Project structure

```text
UFC-Backend/
├── frontend/                 React and Vite application
├── scraper/Data Scraping/    Python scraper and generated CSV datasets
├── src/main/java/            Spring Boot API and persistence layer
├── src/test/                 Backend tests and test database configuration
├── pom.xml                   Maven configuration
└── README.md
```

## REST API

The backend exposes fighter operations under `/api/v1/fighter`.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/v1/fighter` | Retrieve all fighters |
| `GET` | `/api/v1/fighter?full_name=Jon` | Search by full name |
| `GET` | `/api/v1/fighter?stance=Orthodox` | Filter by stance |
| `GET` | `/api/v1/fighter?weight=155 lbs.` | Filter by weight |
| `POST` | `/api/v1/fighter` | Add a fighter |
| `PUT` | `/api/v1/fighter` | Update a fighter |
| `DELETE` | `/api/v1/fighter/{fighterName}` | Delete a fighter |

The React application performs roster searching and combined filter operations
client-side after retrieving the fighter dataset.

## Run locally

### 1. Configure PostgreSQL

Create or use a PostgreSQL database containing the `player_statistic` table, then
provide its connection details when starting Spring Boot:

```bash
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/YOUR_DATABASE \
SPRING_DATASOURCE_USERNAME=YOUR_USERNAME \
SPRING_DATASOURCE_PASSWORD=YOUR_PASSWORD \
./mvnw spring-boot:run
```

The API runs at `http://localhost:8080`.

### 2. Start the React frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. During local development, Vite proxies `/api`
requests to the Spring Boot server.

### 3. Run the scraper

Install the scraper dependencies:

```bash
python3 -m pip install requests beautifulsoup4
```

Run the scraper from its directory:

```bash
cd "scraper/Data Scraping"
python3 ufc_fighter_stats_scraper.py
```

To scrape selected fighter-index letters or choose another output file:

```bash
python3 ufc_fighter_stats_scraper.py --chars abc --output fighters.csv
```

## Configuration

- Set `VITE_API_URL` when the frontend should call a deployed API directly.
- Set `app.cors.allowed-origins` to allow a deployed frontend origin.
- Keep PostgreSQL usernames and passwords in environment variables.
- Do not commit local `.env` files or database credentials.

## Verification

Build the frontend:

```bash
cd frontend
npm run build
```

Run the backend tests:

```bash
./mvnw test
```
