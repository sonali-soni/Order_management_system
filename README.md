# Order_management_system

## Overview

This is a React TypeScript single-page application for managing orders. Users can view a list of existing orders, see detailed information about each order, remove products from an order, add new products to an order, and place orders. The application uses a mock API with data stored in JSON files.

## Features

- View a list of existing orders
- View detailed information for a specific order, including its items and total price
- Remove products from an order
- Add new products to an order
- Place an order and receive a confirmation message

## Installation

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)
- Docker (optional, for containerization)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/sonali-soni/Order_management_system.git
   cd Order_management_system
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application should now be running on http://localhost:3000.

## Usage

### Navigating the Application

- Home Page: Lists all available products.
- Order List: Click on "Orders" in the navigation bar to see a list of all existing orders.
- Order Detail: Click on an order in the order list to view its details. You can remove items, add new items, and place the order from this page.
- About Page: Click on "About" in the navigation bar to learn more about the application.

### Order Management

- Removing an Item: On the Order Detail page, click the "Remove" button next to an item to remove it from the order.
- Adding an Item: Click the "Add item" button to open a modal. Select a product and enter the quantity, then click "Submit" to add the item to the order.
- Placing an Order: After reviewing the order, click the "Place Order" button to place the order. A confirmation message will be displayed.

## Services

- dataService.ts: Contains functions to fetch products, fetch orders, fetch order details, and place an order:

  - fetchProducts: Fetches the list of products.
  - fetchOrders: Fetches the list of orders.
  - fetchOrderDetail: Fetches details for a specific order.
  - placeOrder: Places an order (currently logs to the console).

## Types

- index.ts: Defines TypeScript interfaces for Product, OrderItem, and Order.

## Styling

- Styles are defined using SCSS in the styles directory.

## Configuration

- tsconfig.json: TypeScript configuration file.
- package.json: Contains project metadata and scripts.
- Dockerfile: Dockerfile for containerization.


## Docker Integration

### Dockerfile

The Dockerfile is included in the root directory of the project. It builds the application, installs dependencies, and serves the application using serve:

To build and run the application using Docker, use the following commands:

- Build the Docker image:

  ```bash
  docker build -t order-management-app .
  ```

- Run the Docker container:

  ```bash
  docker run -p 3000:3000 order-management-app
  ```

- Access the application at http://localhost:3000


## Testing

### Running Tests

The project uses Jest for testing. To run the tests, use:

```bash
npm test
```

## API Integration

Currently, the application uses mock data stored in JSON files located in the public directory. To integrate with a real API, update the endpoints in dataService.ts with the actual API URLs.