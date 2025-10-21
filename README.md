# 🐔 Express API for Products

A simple RESTful API built with **Express.js** to manage products.  
Includes middleware, authentication, filtering, pagination, and statistics endpoints.

---

## 🚀 How to Run

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/express-api.git
cd express-api
### 2. Install Dependencies
'''bash
npm install
### 3. Create a .env File
env:
PORT=3000
API_KEY=my-secret-key
### 4. Start the Server
bash:
npm start
Visit:
👉 http://localhost:3000/api

📡 API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products (supports category, search, page, limit)
GET	/api/products/stats	Get product statistics by category
POST	/api/products	Create a new product
PUT	/api/products/:id	Update a product
DELETE	/api/products/:id	Delete a product

🔐 Authentication

All requests must include an API key in the headers:

x-api-key: my-secret-key

🧪 Example Requests
GET All Products
curl -H "x-api-key: my-secret-key" http://localhost:3000/api/products

POST Create Product
curl -X POST http://localhost:3000/api/products \
-H "Content-Type: application/json" \
-H "x-api-key: my-secret-key" \
-d '{"name":"Egg Tray","price":150,"category":"Farm Supplies"}'

GET Product Stats
curl -H "x-api-key: my-secret-key" http://localhost:3000/api/products/stats

🧰 Technologies

Node.js

Express.js

dotenv

📄 License

MIT © 2025


---

Would you like me to include a **ready-to-zip version** (so you can download it as a full project folder)?

