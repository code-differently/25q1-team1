package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import org.junit.jupiter.api.Test;

public class CustomerTest {

  @Test
  public void testAddItemToCart() {
    Customer customer = new Customer("C123");
    Inventory inventory = new Inventory();

    Item apples = new Item("Red apples", 5.00, "apples");
    inventory.addItem(apples, 10);

    customer.addItemToCart(inventory, "apples", 5);

    List<String> cart = customer.getCart();
    assertTrue(cart.contains("apples"));
  }

  @Test
  public void testRemoveItemFromCart() {
    Customer customer = new Customer("C123");
    Inventory inventory = new Inventory();

    Item bananas = new Item("Bananas", 5.00, "bananas");
    inventory.addItem(bananas, 10);

    customer.addItemToCart(inventory, "bananas", 5);
    boolean removed = customer.removeItemFromCart("bananas");
    assertTrue(removed);
    assertFalse(customer.getCart().contains("bananas"));
  }

  @Test
  public void testSetAndGetCustomerId() {
    Customer customer = new Customer("C123");
    customer.setCustomerId("C999");
    assertEquals("C999", customer.getCustomerId());
  }

  @Test
  public void testCartInitiallyEmpty() {
    Customer customer = new Customer("C123");
    assertTrue(customer.getCart().isEmpty());
  }
}
