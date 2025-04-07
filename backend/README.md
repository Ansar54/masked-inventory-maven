
# Product Management Backend API

This is a FastAPI backend for the Product Management application using PostgreSQL.

## Setup Instructions

1. **Prerequisites**:
   - Python 3.8 or higher
   - PostgreSQL

2. **Create a virtual environment**:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

4. **Create PostgreSQL Database**:
   ```
   # Connect to PostgreSQL
   psql -U postgres
   
   # Create database
   CREATE DATABASE productmanagement;
   
   # Exit psql
   \q
   ```

5. **Set up environment variables**:
   - Create a `.env` file (or modify the existing one) with your database connection information:
   ```
   DATABASE_URL=postgresql://postgres:postgres@localhost/productmanagement
   ```

6. **Run database migrations**:
   ```
   alembic upgrade head
   ```

7. **Start the server**:
   ```
   uvicorn main:app --reload
   ```

8. **Access the API documentation**:
   - Open your browser and visit `http://localhost:8000/docs`

## API Endpoints

- `GET /api/products/` - Get all products
- `GET /api/products/{product_id}` - Get a specific product
- `POST /api/products/` - Create a new product
- `PUT /api/products/{product_id}` - Update a product
- `DELETE /api/products/{product_id}` - Delete a product
- `PUT /api/products/{product_id}/mask` - Mask a product with Amazon FNSKU
