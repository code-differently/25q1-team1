# 25q1-team1# Grocery Store Inventory System (Java)

This is a simple Java console-based inventory system for a grocery store. It features basic functionality such as managing items, inventory, employees, and customer carts. The project includes exception handling, unit tests, and integration tests.

## Features

- **Item**: Represents an item with name, cost, and ID.
- **Inventory**: Manages item stock and availability.
- **Employee**: Can add new items or restock existing ones.
- **Customer**: Can reserve (add) items in their cart and remove them.
- **Cart**: Tracks items reserved by a customer, including quantity and total price.
- **Custom Exceptions**:
  - `ItemOutOfStockException`: Thrown when a customer tries to reserve more items than available.
  - `ItemNotFoundException`: Thrown when an employee tries to restock an item that doesn't exist.

## Project Structure

src/ ├── Item.java ├── Inventory.java ├── Employee.java ├── Customer.java ├── Cart.java ├── ItemOutOfStockException.java ├── ItemNotFoundException.java tests/ ├── ItemTest.java ├── InventoryTest.java ├── CustomerTest.java ├── EmployeeTest.java ├── CartTest.java ├── SystemIntegrationTest.java
