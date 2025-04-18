package q1.team1;

import java.util.ArrayList;
import java.util.List;


public class Customer {
    private String customerId;
    private final List<String> cart;

    // Constructor
    public Customer(String customerId) {
        this.customerId = customerId;
        this.cart = new ArrayList<>();
    }

    // Getter for customer ID
    public String getCustomerId() {
        return customerId;
    }

    // Setter for customer ID
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    // Get current cart contents
    public List<String> getCart() {
        return cart;
    }

    // Add item to cart
    public void addItemToCart(String item) {
        cart.add(item);
    }

    // Remove item from cart
    public boolean removeItemFromCart(String item) {
        return cart.remove(item); // returns true if removed
    }
}