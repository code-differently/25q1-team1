package q1.team1;

public class Employee {
  private String employeeId;

  public Employee(String employeeId) {}

  // This is the inventory. It will store the items and their quantities.
  // The key is the item name, and the value is the quantity.

  // Method to add an item to the inventory
  public void addItem(Item item, int quantity, IInventory inventory) {
    inventory.addItem(item, quantity);
  }

  // Add to the stack amount of an existing item.
  public void addToStock(String itemId, int quantity, IInventory inventory) {
    inventory.addStock(itemId, quantity);
  }

  // Getter for customer ID
  public String getCustomerId() {
    return employeeId;
  }

  // Setter for customer ID
  public void setCustomerId(String employeeId) {
    this.employeeId = employeeId;
  }
}
