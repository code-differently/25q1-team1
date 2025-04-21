package q1.team1;

public class Customer {
  private String customerId;
  private final Cart cart;

  // Constructor
  public Customer(String customerId) {
    this.customerId = customerId;
    // Create a Cart instance for this customer, using customer ID as cart ID too
    this.cart = new Cart(customerId + "_cart", customerId);
  }

  // Getter for customer ID
  public String getCustomerId() {
    return customerId;
  }

  // Setter for customer ID
  public void setCustomerId(String customerId) {
    this.customerId = customerId;
  }

  // Getter for the customer's Cart
  public Cart getCart() {
    return cart;
  }

  // Add item to cart (only if it can be reserved)
  public void addItemToCart(Inventory inventory, String itemId, int quantity) {
    Item item = inventory.getItem(itemId);
    if (inventory.reserveItem(itemId, quantity)) {
      cart.addItem(item, quantity);
    }
  }

  // Remove item from cart
  public void removeItemFromCart(Item item, int quantity) {
    try {
      cart.removeItem(item, quantity);
    } catch (Exception e) {
      System.out.println("Error: " + e.getMessage());
    }
  }
}
