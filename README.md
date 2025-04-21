# Grocery Story Inventory System
## The Problem: 
Managing inventory can lead to errors such as: 
- Overbooking or overselling items
- Poor visibility into stock levels
- No easy way for customers to reserve products

  The goal of our project is to create a simple, easy to work with system for a grocery store that helps employees manage stock efficiently and customers view and reserve items that are in stock.

  ---

  ## Our Solution
  We designed an object-oriented system using Java that separates responsibilities across class to keep the code clean and maintainable.

  ### Key Features:
  - Add and manage products with inventory tracking.
  - Real-time stock updates and item reservation.
  - Custom exceptions for handling errors clearly.

    ### Core Classes:
    - `Item`: Holds basic product information.
    - `Inventory`: Manages stock and availability.
    - `Cart`: Handles item reservations.
    - `Customer`: Stores customer and cart details.
    - `Employee`: Used for adding new items to the inventory and restock existing items. 

      We follows the **SOLID Principles** to make the design scalable and easy to maintain.

      ---

      ## How We'd Improve The System:
      - Connect to a **database** to persist inventory and orders.
      - Add a **user inferface** like a web page.
      - Build an admin dashboard for employees to easily access and manage items.

     ---

    ## Authors: Team 1
    - A'nanatawa Mcintyre
    - Jason Watson
    - John Bey
    - Rasheed Miller
    - Mercedes Mathews

    ##Java, JUnit (for testing), and GitHub (for version control) were used to complete this project

    ---

    ## Project Structure:
    /src
├── Item.java
├── Inventory.java
├── Cart.java
├── Customer.java
├── Product.java
└── exceptions/
├── ItemNotFoundException.java
└── ItemOutOfStockException.java

  ---

  ## To run our project:
  1. Clone the repo
  2. Open in your IDE (VS Code for example)
  3. Run the main class or unit tests

  ---
  ## To run our project CLI
   1. Open Terminal in VS Code
   2. Run from the root app/src/main/java
   3. Run command javac q1/team1/*.java
   4. Run command java q1.team1.CartCLI (To initiate interactive Terminal)


