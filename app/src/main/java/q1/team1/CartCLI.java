package q1.team1;

import java.util.Scanner;

public class CartCLI {

  private static Cart cart;
  private static Scanner scanner;

  public static void main(String[] args) {
    scanner = new Scanner(System.in);
    cart = new Cart("CART001", "CUSTOMER123");

    System.out.println("Welcome to the Shopping Cart CLI!");

    boolean running = true;
    while (running) {
      printMenu();
      String choice = scanner.nextLine();

      switch (choice) {
        case "1" -> handleAddItem();
        case "2" -> handleRemoveItem();
        case "3" -> cart.printCart();
        case "4" -> {
          running = false;
          System.out.println("Goodbye!");
        }
        default -> System.out.println("Invalid option. Please try again.");
      }
    }

    scanner.close();
  }

  private static void printMenu() {
    System.out.println("\nChoose an option:");
    System.out.println("1. Add Item to Cart");
    System.out.println("2. Remove Item from Cart");
    System.out.println("3. View Cart");
    System.out.println("4. Exit");
    System.out.print("Enter choice: ");
  }

  private static void handleAddItem() {
    System.out.print("Enter item ID: ");
    String id = scanner.nextLine();

    System.out.print("Enter item name: ");
    String name = scanner.nextLine();

    System.out.print("Enter item price: ");
    double price = Double.parseDouble(scanner.nextLine());

    System.out.print("Enter quantity: ");
    int quantity = Integer.parseInt(scanner.nextLine());

    Item item = new Item(id, price, name);
    cart.addItem(item, quantity);

    System.out.println("Item added to cart.");
  }

  private static void handleRemoveItem() {

    System.out.print("Enter item id to remove: ");
    String id = scanner.nextLine();

    Item itemToRemove = null;
    for (Item item : cart.getItems().keySet()) {
      if (item.getName().equalsIgnoreCase(id)) {

    System.out.print("Enter item name to remove: ");
    String name = scanner.nextLine();

    Item itemToRemove = null;
    for (Item item : cart.getItems().keySet()) {
      if (item.getName().equalsIgnoreCase(name)) {

        itemToRemove = item;
        break;
      }
    }

    if (itemToRemove == null) {
      System.out.println("Item not found in cart.");
      return;
    }

    System.out.print("Enter quantity to remove: ");
    int quantity = Integer.parseInt(scanner.nextLine());

    try {
      cart.removeItem(itemToRemove, quantity);
      System.out.println("Item removed.");
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }
  }
}
