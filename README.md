# Sugi_back
Supabase Edge Functions Project
Overview
This project implements a set of Edge Functions using Supabase to manage a relational database containing information about books and authors. The goal is to provide a robust API for querying and managing data effectively.

Table of Contents
Getting Started
Project Structure
API Endpoints
Setup Instructions
Design Choices
Query Logic
Testing the API
Contributing
License

Getting Started
Prerequisites
Node.js (version 14 or later)
Deno (latest version)
Supabase account


Installation
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install the Supabase CLI if you haven't already:

bash
Copy code
npm install -g supabase
Configure your Supabase environment:

Create a .env file in the supabase/functions directory and add your Supabase project URL and service role key:

makefile
Copy code
SUPABASE_URL=https://your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
Project Structure
bash
Copy code
/supabase
  └── /functions
      ├── index.ts         # Main entry for edge functions
      ├── /Controllers
      │   ├── BookController.ts
      │   └── AuthController.ts
      ├── /routers
      │   └── index.ts
      └── /utils
          └── middlewares.ts


          API Endpoints
Books
GET /sugi/books: Retrieves a list of books with optional query parameters for filtering by author_id, sorting by publish_date, and pagination.
POST /sugi/auth/token: Authenticates a user and returns a JWT token.
Authors
GET /sugi/authors: Retrieves a list of authors with their details.
Setup Instructions
Deploy the Functions: Deploy your functions to Supabase:

bash
Copy code
npx supabase functions deploy
Serve the Functions Locally: To test the functions locally:

bash
Copy code
npx supabase functions serve sugi
Test the API: You can test the API using Postman or any REST client.

Design Choices
Database Schema: A relational database is designed with two main tables: Books and Authors to maintain normalized data.
API Structure: The API is structured using controllers to handle different routes, making it modular and easier to maintain.
Query Logic
Get All Books: The getBooks method retrieves books with optional filters for author_id and sorting by publish_date.
Authentication: The getToken method allows users to authenticate and receive a token for secure API access.
Testing the API
To test the API, use a tool like Postman. Import the following collection or use the endpoints mentioned above directly.

Postman Collection: [Link to your Postman collection]
Contributing
Contributions are welcome! Please follow these steps to contribute:

Fork the repository
Create a new branch (git checkout -b feature-branch)
Commit your changes (git commit -m 'Add new feature')
Push to the branch (git push origin feature-branch)
Create a new Pull Request