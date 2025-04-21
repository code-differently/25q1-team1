package q1.team1;

public class Customer {
  private String customerId;

  // Constructor
  public Customer(String customerId) {
    this.customerId = customerId;
  }

  // Getter for customer ID
  public String getCustomerId() {
    return customerId;
  }

  // Setter for customer ID
  public void setCustomerId(String customerId) {
    this.customerId = customerId;
  }

  // Add item to cart (only if it can be reserved)
  public void addItemToCart(IInventory inventory, String itemId, int quantity, ICart cart) {
    Item item = inventory.getItem(itemId);
    if (inventory.reserveItem(itemId, quantity)) {
      cart.addItem(item, quantity);
    }
  }

  // Remove item from cart
  public void removeItemFromCart(Item item, int quantity, ICart cart) throws Exception {
    cart.removeItem(item, quantity);
  }
}
