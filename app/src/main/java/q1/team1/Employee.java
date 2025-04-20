package q1.team1;

public class Employee {

  public Employee(String john_Doe, int par, int software_Engineer) {}

  // This is the inventory. It will store the items and their quantities.
  // The key is the item name, and the value is the quantity.

  // Method to add an item to the inventory
  public void addItem(Item item, int quantity, Inventory inventory) {
    inventory.addItem(item, quantity);
  }

  // Add to the stack amount of an existing item.
  public void addToStock(String itemId, int quantity, Inventory inventory) {
    inventory.addStock(itemId, quantity);
  }
}
