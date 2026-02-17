# 📝 Task Management System (Full-Stack)

A robust, full-stack Task Management application featuring a **Spring Boot 3** backend and a **React.js** frontend. The system allows users to manage their daily tasks through a secure, authenticated interface with full CRUD (Create, Read, Update, Delete) capabilities.

## 🚀 Key Features

* **JWT Authentication**: Secure login and registration using JSON Web Tokens (JWT) and Spring Security 6.
* **Role-Based Access**: Infrastructure for USER and ADMIN roles to manage permissions.
* **Full CRUD Functionality**: Users can create, view, mark as complete/incomplete, and delete tasks.
* **Responsive UI**: A modern, clean interface built with React and styled for clarity.
* **Database Persistence**: Fully integrated with PostgreSQL for reliable data storage.

---

## 🛠️ Technical Stack

### **Backend**

* **Java 17** & **Spring Boot 3.2.x**
* **Spring Security 6** (Stateless JWT authentication)
* **Spring Data JPA** (Hibernate)
* **PostgreSQL** (Relational Database)
* **Swagger/OpenAPI** (API documentation and testing)

### **Frontend**

* **React.js** (Functional components with Hooks)
* **Vite** (Build tool)
* **Axios** (HTTP client for API communication)

---

## ⚙️ Installation & Setup

### **Prerequisites**

* **JDK 17** or higher
* **Node.js** (v18+) and **npm**
* **PostgreSQL** instance running locally

### **1. Database Configuration**

Create a database named `task_db` in PostgreSQL:

```sql
CREATE DATABASE task_db;

```

### **2. Backend Setup**

1. Navigate to the `backend` folder.
2. Open `src/main/resources/application.properties` and update your database credentials:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/task_db
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

```


3. Run the application using Maven or your IDE:
```bash
mvn spring-boot:run

```



### **3. Frontend Setup**

1. Navigate to the `task-frontend` folder.
2. Install the required dependencies:
```bash
npm install

```


3. Start the development server:
```bash
npm run dev

```


4. Access the app at `http://localhost:5173`.

---

## 🧪 API Endpoints

The backend exposes a RESTful API. You can test these via the Swagger UI at `http://localhost:8080/swagger-ui/index.html`.

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| **POST** | `/api/auth/register` | Register a new account | No |
| **POST** | `/api/auth/login` | Login and receive a JWT token | No |
| **GET** | `/api/tasks` | Fetch all tasks for the user | Yes (Bearer Token) |
| **POST** | `/api/tasks` | Create a new task | Yes (Bearer Token) |
| **PUT** | `/api/tasks/{id}` | Update task status/title | Yes (Bearer Token) |
| **DELETE** | `/api/tasks/{id}` | Permanently delete a task | Yes (Bearer Token) |

---

## 🔐 Security Implementation

* **Password Encoding**: Uses `BCryptPasswordEncoder` to hash passwords before storing them in the database.
* **JWT Filter**: A custom `JwtAuthenticationFilter` intercepts every request to validate the token in the `Authorization` header.
* **CORS**: Configured to allow communication specifically between the React frontend (port 5173) and the Spring Boot backend (port 8080).

---

## 👨‍💻 Developed By

* **Vamsi Krishna Adusumilli**

