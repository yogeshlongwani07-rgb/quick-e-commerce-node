# 🚀 Distributed Quick Commerce Fulfillment Engine

A production-grade Quick Commerce Backend inspired by Blinkit, Zepto, and Instamart.

This project focuses on solving real-world backend engineering challenges such as inventory reservation, warehouse routing, rider assignment, distributed transactions, event-driven communication, real-time tracking, and scalable order fulfillment.

---

# 📌 Problem Statement

Traditional e-commerce platforms deliver products within hours or days. Quick commerce platforms aim to deliver products within 10–30 minutes.

Building such a system introduces several engineering challenges:

* Finding the nearest warehouse with available inventory
* Preventing overselling during high traffic
* Reserving stock before payment completion
* Managing warehouse operations
* Assigning pickers and delivery partners
* Tracking orders in real time
* Handling failures across multiple services
* Scaling the system under heavy load

The goal of this project is to design and implement a backend system capable of handling these challenges using modern backend engineering practices.

---

# 🎯 Learning Objectives

This project helps developers learn:

* Geospatial Search
* Event-Driven Architecture
* Distributed Transactions
* Saga Pattern
* Inventory Reservation
* Redis Locking
* Queue Processing
* Real-Time Communication
* Warehouse Routing
* Rider Dispatch Algorithms
* State Machines
* Distributed Caching
* Analytics Pipelines
* Production-Level Backend Architecture

---

# 👥 User Roles

## Customer

Customer should be able to:

* Register/Login
* Browse Products
* Search Products
* Add Products to Cart
* Place Orders
* Track Orders
* Cancel Orders
* View Order History

---

## Warehouse Staff

Warehouse staff should be able to:

* View Assigned Orders
* Pick Products
* Pack Products
* Mark Orders Ready

---

## Delivery Partner

Delivery partners should be able to:

* Accept Delivery Tasks
* Update Delivery Status
* Share Live Location
* Complete Deliveries

---

## Admin

Admin should be able to:

* Manage Products
* Manage Inventory
* Manage Warehouses
* Manage Users
* View Analytics

---

# 🏗️ System Workflow

```text
Customer Places Order
            ↓
Find Nearest Warehouse
            ↓
Reserve Inventory
            ↓
Payment Processing
            ↓
Assign Picker
            ↓
Pack Order
            ↓
Assign Rider
            ↓
Dispatch Order
            ↓
Deliver Order
```

---

# 🔐 Authentication Module

## Features

* Registration
* Login
* Refresh Token
* Logout
* Role-Based Access Control

## APIs

```http
POST /auth/register
POST /auth/login
POST /auth/refresh-token
POST /auth/logout
```

## Learn

* JWT Authentication
* Refresh Tokens
* RBAC
* Security Best Practices

---

# 🛒 Product Catalog Module

## Features

* Product Listing
* Product Details
* Categories
* Product Search
* Product Filtering

## APIs

```http
GET /products
GET /products/:id
POST /products
PATCH /products/:id
DELETE /products/:id
```

## Learn

* Pagination
* Filtering
* Search Optimization

---

# 🏢 Warehouse Management Module

## Features

* Create Warehouses
* Update Warehouses
* Warehouse Location Tracking
* Warehouse Capacity Management

## APIs

```http
POST /warehouses
GET /warehouses
GET /warehouses/:id
PATCH /warehouses/:id
DELETE /warehouses/:id
```

## Learn

* GeoJSON
* Warehouse Modeling

---

# 📦 Inventory Management Module

## Problem

Inventory should not be deducted immediately after order creation.

### Example

```text
Stock = 10

User Orders 2

Available = 8
Reserved = 2
```

If payment fails:

```text
Available = 10
Reserved = 0
```

## Features

* Inventory Reservation
* Inventory Release
* Inventory Commit
* Stock Tracking

## APIs

```http
POST /inventory/reserve
POST /inventory/release
POST /inventory/commit
GET /inventory
```

## Learn

* Redis Locks
* Concurrency Control
* Atomic Operations
* Race Conditions

---

# 🌍 Warehouse Routing Engine

## Problem

Determine which warehouse should fulfill an order.

### Example

```text
Warehouse A = 2km

Warehouse B = 5km

Warehouse C = 7km
```

System selects:

```text
Warehouse A
```

If inventory unavailable:

```text
Warehouse B
```

## Learn

* Geospatial Queries
* Distance Calculations
* Routing Algorithms

---

# 📍 Geospatial Search

## Features

* Find Nearby Warehouses
* Find Nearby Riders
* Radius-Based Search

## MongoDB Example

```javascript
{
  type: "Point",
  coordinates: [longitude, latitude]
}
```

## Learn

* GeoJSON
* 2dsphere Indexes
* Location-Based Services

---

# 📋 Order Management Module

## Features

* Place Orders
* Update Orders
* Cancel Orders
* Order Tracking
* Order History

## APIs

```http
POST /orders
GET /orders
GET /orders/:id
PATCH /orders/:id
DELETE /orders/:id
```

---

# 🔄 Order State Machine

Every order must follow a predefined workflow.

```text
CREATED
↓
PAYMENT_PENDING
↓
PAID
↓
INVENTORY_RESERVED
↓
PICKING
↓
PACKING
↓
READY_FOR_DISPATCH
↓
OUT_FOR_DELIVERY
↓
DELIVERED
```

Cancellation Flow:

```text
CREATED
↓
CANCELLED
```

Invalid Flow:

```text
CREATED
↓
DELIVERED
```

## Learn

* Finite State Machines
* Workflow Management
* Business Rule Enforcement

---

# 💳 Payment Service

## Features

* Process Payments
* Payment Status Tracking
* Refund Processing

## States

```text
PENDING
SUCCESS
FAILED
REFUNDED
```

## Learn

* Payment Workflows
* Transaction Management

---

# 🚴 Rider Dispatch Engine

## Problem

Find and assign the best rider automatically.

### Factors

```text
Distance
Availability
Current Deliveries
Performance Score
```

## Workflow

```text
Order Ready
      ↓
Find Nearby Riders
      ↓
Evaluate Candidates
      ↓
Assign Rider
```

## Learn

* Matching Algorithms
* Dispatch Systems
* Resource Allocation

---

# 📡 Event-Driven Architecture

Services communicate through events instead of direct API calls.

## Events

```text
OrderCreated
PaymentCompleted
InventoryReserved
PickerAssigned
OrderPacked
RiderAssigned
OrderDelivered
OrderCancelled
```

## Learn

* Pub/Sub
* Event Emitters
* Loose Coupling
* Service Communication

---

# 🔄 Saga Pattern

Used to manage distributed transactions.

## Success Flow

```text
Order Created
↓
Payment Success
↓
Inventory Reserved
↓
Picker Assigned
↓
Rider Assigned
↓
Delivered
```

## Failure Flow

Inventory Reservation Failed

```text
Refund Payment
↓
Cancel Order
```

Rider Assignment Failed

```text
Release Inventory
↓
Refund Payment
↓
Cancel Order
```

## Learn

* Distributed Transactions
* Compensation Actions
* Failure Recovery

---

# 👷 Picker Assignment Engine

Before delivery, warehouse staff must prepare the order.

## Workflow

```text
Order
↓
Assign Picker
↓
Picking
↓
Packing
↓
Ready For Dispatch
```

## Learn

* Resource Scheduling
* Task Assignment Systems

---

# ⚡ Real-Time Tracking

## Features

* Live Order Status
* Live Rider Location
* Inventory Updates

## Events

```javascript
socket.emit("order-status-update");
socket.emit("rider-location-update");
socket.emit("inventory-update");
```

## Learn

* Socket.io
* WebSockets
* Event Broadcasting

---

# 🔔 Notification Service

## Features

* Order Confirmation
* Payment Updates
* Delivery Updates
* Inventory Alerts

## Channels

```text
Email
SMS
Push Notifications
```

## Learn

* Background Notifications
* Event Subscribers

---

# 🚦 API Rate Limiting

Protect APIs against abuse.

## Example

```text
100 Requests Per Minute
```

## Technologies

```text
Redis
Express Rate Limit
```

## Learn

* API Security
* Traffic Control

---

# 🧠 Distributed Caching

Cache frequently accessed data.

## Cached Data

```text
Popular Products
Trending Products
Nearby Warehouses
Top Categories
```

## Technologies

```text
Redis
```

## Learn

* Cache Strategy
* Cache Invalidation
* Cache Warming

---

# 📊 Analytics Service

Generate business reports.

## Reports

* Revenue
* Orders Per Hour
* Top Products
* Warehouse Performance
* Delivery Time
* Cancellation Rate

## Learn

* MongoDB Aggregation Pipeline
* Business Analytics

---

# ⚙️ Background Jobs

Process tasks asynchronously.

## Jobs

```text
Notifications
Refund Processing
Inventory Cleanup
Report Generation
Statistics Updates
```

## Technologies

```text
BullMQ
Redis
```

## Learn

* Queues
* Workers
* Retry Strategies
* Job Scheduling

---

# 🗄️ Database Collections

## Users

```javascript
{
  _id,
  name,
  email,
  role
}
```

## Products

```javascript
{
  _id,
  name,
  price,
  category
}
```

## Warehouses

```javascript
{
  _id,
  name,
  location
}
```

## Inventory

```javascript
{
  warehouseId,
  productId,
  available,
  reserved
}
```

## Orders

```javascript
{
  customerId,
  status,
  totalAmount
}
```

## Riders

```javascript
{
  location,
  isAvailable
}
```

## Payments

```javascript
{
  orderId,
  amount,
  status
}
```

## Notifications

```javascript
{
  userId,
  type,
  status
}
```

---

# 📁 Suggested Folder Structure

```text
src
│
├── modules
│   ├── auth
│   ├── product
│   ├── inventory
│   ├── warehouse
│   ├── order
│   ├── payment
│   ├── dispatch
│   ├── analytics
│
├── events
│
├── queues
│
├── workers
│
├── sockets
│
├── middleware
│
├── database
│
├── config
│
└── utils
```

---

# 🛠️ Tech Stack

## Backend

```text
Node.js
Express.js
TypeScript
```

## Database

```text
MongoDB
Mongoose
```

## Authentication

```text
JWT
bcrypt
```

## Real-Time

```text
Socket.io
```

## Caching

```text
Redis
```

## Queue System

```text
BullMQ
```

## Validation

```text
Zod
```

## API Documentation

```text
Swagger
```

## Containerization

```text
Docker
Docker Compose
```

---

# 🚀 Project Execution Roadmap

## Phase 1

Build:

```text
Authentication Module
Product Module
Warehouse Module
Inventory Module
```

Duration:

```text
1 Week
```

---

## Phase 2

Build:

```text
Cart Module
Order Module
Payment Module
```

Duration:

```text
1 Week
```

---

## Phase 3

Build:

```text
Inventory Reservation System
Redis Locking
```

Duration:

```text
1 Week
```

---

## Phase 4

Build:

```text
Warehouse Routing Engine
Geospatial Queries
Dispatch Engine
```

Duration:

```text
1 Week
```

---

## Phase 5

Build:

```text
Socket.io
BullMQ
Notification Service
```

Duration:

```text
1 Week
```

---

## Phase 6

Build:

```text
Analytics Service
Swagger Documentation
Docker Deployment
Testing
```

Duration:

```text
1 Week
```

---

# ▶️ How To Run The Project

## Clone Repository

```bash
git clone <repository-url>
cd quick-commerce-backend
```

## Install Dependencies

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=mongodb://localhost:27017/quick-commerce

JWT_SECRET=your_jwt_secret

REDIS_HOST=localhost
REDIS_PORT=6379
```

## Start MongoDB

```bash
docker run -d \
--name mongodb \
-p 27017:27017 \
mongo
```

## Start Redis

```bash
docker run -d \
--name redis \
-p 6379:6379 \
redis
```

## Start Development Server

```bash
npm run dev
```

## Build Project

```bash
npm run build
```

## Start Production Server

```bash
npm start
```

---

# 🎓 Concepts Mastered After Completion

* Advanced Node.js Architecture
* Inventory Management Systems
* Distributed Transactions
* Saga Pattern
* Redis Locking
* Event-Driven Systems
* Queue Processing
* Geospatial Search
* Rider Dispatch Algorithms
* Real-Time Communication
* Warehouse Routing
* Background Workers
* Distributed Caching
* Production-Grade Backend Engineering
