package q1.team1;

import java.util.HashMap;
import java.util.Map;

public class Cart {
<<<<<<< HEAD
  private final String cartId;
  private final String customerId;
  private final Map<Item, Integer> items; // Item → Quantity

  public Cart(String cartId, String customerId) {
    this.cartId = cartId;
    this.customerId = customerId;
    this.items = new HashMap<>();
  }

  public void addItem(Item item, int quantity) {
    if (item == null || quantity <= 0) {
      throw new IllegalArgumentException("Invalid item or quantity.");
    }
    items.put(item, items.getOrDefault(item, 0) + quantity);
  }

  public void removeItem(Item item, int quantity) throws Exception {
    if (!items.containsKey(item)) {
      throw new Exception("Item not found in cart.");
    }

    int currentQty = items.get(item);
    if (quantity >= currentQty) {
      items.remove(item);
    } else {
      items.put(item, currentQty - quantity);
    }
  }

  public double getTotalPrice() {
    double total = 0.0;
    for (Map.Entry<Item, Integer> entry : items.entrySet()) {
      total += entry.getKey().getCost() * entry.getValue();
    }
    return total;
  }

  public int getTotalItems() {
    int total = 0;
    for (int quantity : items.values()) {
      total += quantity;
    }
    return total;
  }

  public void printCart() {
    System.out.println("Cart ID: " + cartId + " (Customer ID: " + customerId + ")");
    if (items.isEmpty()) {
      System.out.println("Cart is empty.");
      return;
    }

    for (Map.Entry<Item, Integer> entry : items.entrySet()) {
      System.out.println(entry.getKey().getName() + " x " + entry.getValue());
    }
    System.out.println("Total items: " + getTotalItems());
    System.out.println("Total price: $" + getTotalPrice());
  }

  public boolean isEmpty() {
    return items.isEmpty();
  }

  // Getters
  public String getCartId() {
    return cartId;
  }

  public String getCustomerId() {
    return customerId;
  }

  public Map<Item, Integer> getItems() {
    return items;
  }
=======
    private final String cartId;
    private final String customerId;
    private final Map<Item, Integer> items; // Item → Quantity

    public Cart(String cartId, String customerId) {
        this.cartId = cartId;
        this.customerId = customerId;
        this.items = new HashMap<>();
    }

    public void addItem(Item item, int quantity) {
        if (item == null || quantity <= 0) {
            throw new IllegalArgumentException("Invalid item or quantity.");
        }
        items.put(item, items.getOrDefault(item, 0) + quantity);
    }

    public void removeItem(Item item, int quantity) throws Exception {
        if (!items.containsKey(item)) {
            throw new Exception("Item not found in cart.");
        }

        int currentQty = items.get(item);
        if (quantity >= currentQty) {
            items.remove(item);
        } else {
            items.put(item, currentQty - quantity);
        }
    }

    public double getTotalPrice() {
        double total = 0.0;
        for (Map.Entry<Item, Integer> entry : items.entrySet()) {
            total += entry.getKey().getCost() * entry.getValue();
        }
        return total;
    }

    public int getTotalItems() {
        int total = 0;
        for (int quantity : items.values()) {
            total += quantity;
        }
        return total;
    }

    public void printCart() {
        System.out.println("Cart ID: " + cartId + " (Customer ID: " + customerId + ")");
        if (items.isEmpty()) {
            System.out.println("Cart is empty.");
            return;
        }

        for (Map.Entry<Item, Integer> entry : items.entrySet()) {
            System.out.println(entry.getKey().getName() + " x " + entry.getValue());
        }
        System.out.println("Total items: " + getTotalItems());
        System.out.println("Total price: $" + getTotalPrice());
    }

    public boolean isEmpty() {
        return items.isEmpty();
    }

    // Getters
    public String getCartId() {
        return cartId;
    }

    public String getCustomerId() {
        return customerId;
    }

    public Map<Item, Integer> getItems() {
        return items;
    }
>>>>>>> refs/remotes/origin/feat-RMiller_OOP_Project_CartClass
}
