# Moto Elegance Backend API

A Node.js/Express.js RESTful API with PostgreSQL database for the Moto Elegance car catalog application.

## Features

- RESTful API endpoints for cars and brands
- PostgreSQL database with Sequelize ORM
- Data validation and error handling
- Flexible filtering for cars (by brand, price range, body type, etc.)
- Auto-imports data from the original db.json file (if available)

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository or navigate to the backend directory
2. Install dependencies:

```bash
npm install
```

3. Set up your PostgreSQL database and update the `.env` file with your credentials:

```
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=moto_elegance_db
DB_PORT=5432
DB_FORCE_RESET=false
```

## Running the Application

### Development mode

```bash
npm run dev
```

This will start the server with nodemon for automatic restarts when changes are detected.

### Production mode

```bash
npm start
```

### Reset Database and Seed Data

To reset the database and seed initial data:

```bash
npm run reset-db
```

Or manually set the environment variable:

```bash
DB_FORCE_RESET=true npm start
```

## API Endpoints

### Cars

- `GET /api/cars` - Get all cars (with filtering options)
- `GET /api/cars/:id` - Get car by ID
- `GET /api/cars/stats` - Get car statistics
- `POST /api/cars` - Create a new car
- `POST /api/cars/bulk` - Bulk insert multiple cars
- `PUT /api/cars/:id` - Update a car
- `DELETE /api/cars/:id` - Delete a car

### Brands

- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID
- `GET /api/brands/name/:name` - Get brand by name
- `GET /api/brands/:id/cars` - Get all cars for a specific brand
- `POST /api/brands` - Create a new brand
- `PUT /api/brands/:id` - Update a brand
- `DELETE /api/brands/:id` - Delete a brand

## Query Parameters for Filtering

### Cars

- `brand` - Filter by brand ID
- `model` - Filter by model name (partial match)
- `bodyType` - Filter by body type
- `fuelType` - Filter by fuel type
- `transmission` - Filter by transmission type
- `year` - Filter by year
- `minPrice` - Filter by minimum price
- `maxPrice` - Filter by maximum price

### Brands

- `name` - Filter by brand name (partial match)
- `popular` - Filter popular brands (true/false)
- `sponsored` - Filter sponsored brands (true/false)

## Development

### Project Structure

```
moto-elegance-backend/
│
├── config/
│   └── db.config.js         # Database configuration
├── controllers/
│   ├── car.controller.js    # Car controller
│   └── brand.controller.js  # Brand controller
├── middleware/
│   ├── index.js             # Middleware index
│   ├── authJwt.js           # Authentication middleware
│   └── carValidation.middleware.js # Car validation middleware
├── models/
│   ├── index.js             # Sequelize models index
│   ├── car.model.js         # Car model
│   └── brand.model.js       # Brand model
├── routes/
│   ├── car.routes.js        # Car routes
│   └── brand.routes.js      # Brand routes
├── seeders/
│   └── seed.js              # Data seeder
├── examples/
│   └── bulk-insert-example.js # Example for using bulk insert API
├── .env                     # Environment variables
├── server.js                # Express server setup
└── package.json             # Project dependencies
```

## Bulk Insert API

The bulk insert API allows you to insert multiple car records at once:

### Endpoint

```
POST /api/cars/bulk
```

### Request Body

The request body should be an array of car objects, each containing at least the required fields:

- `model` - Car model name
- `year` - Manufacturing year
- `price` - Car price
- `brandId` - Foreign key reference to the brand

Example:

```json
[
  {
    "model": "Civic",
    "year": 2023,
    "price": 25000,
    "brandId": 1,
    "fuelType": "Petrol",
    "transmission": "Automatic",
    "bodyType": "Sedan"
    // ... additional fields
  },
  {
    "model": "Mustang GT",
    "year": 2023,
    "price": 55000,
    "brandId": 2
    // ... additional fields
  }
]
```

### Response

A successful response will return:

- HTTP Status 201 (Created)
- JSON object with:
  - `message` - Success message
  - `count` - Number of cars inserted
  - `data` - Array of inserted car objects with their IDs

Example:

```json
{
  "message": "2 cars were inserted successfully!",
  "count": 2,
  "data": [
    {
      "id": 50,
      "model": "Civic",
      "year": 2023
      // ... other fields
    },
    {
      "id": 51,
      "model": "Mustang GT",
      "year": 2023
      // ... other fields
    }
  ]
}
```

### Error Handling

In case of validation errors or other issues, the API will return:

- HTTP Status 400 (Bad Request) for validation errors
- HTTP Status 500 (Internal Server Error) for server errors
- JSON object with error message and details

Check the `examples/bulk-insert-example.js` file for a complete example of how to use this API.

## License

This project is licensed under the ISC License.
