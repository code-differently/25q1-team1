package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Map;
import org.junit.jupiter.api.Test;

public class CustomerTest {

  @Test
  public void testAddItemToCart() {
    Customer customer = new Customer("C123");
    Inventory inventory = new Inventory();

    Item apples = new Item("Red apples", 5.00, "apples");
    inventory.addItem(apples, 10);

    customer.addItemToCart(inventory, "apples", 5);

    Map<Item, Integer> cartItems = customer.getCart().getItems();
    assertTrue(cartItems.containsKey(apples));
    assertEquals(5, cartItems.get(apples));
  }

  @Test
  public void testRemoveItemFromCart() {
    Customer customer = new Customer("C123");
    Inventory inventory = new Inventory();

    Item bananas = new Item("Bananas", 5.00, "bananas");
    inventory.addItem(bananas, 10);

    customer.addItemToCart(inventory, "bananas", 5);
    customer.removeItemFromCart(bananas, 3);

    Map<Item, Integer> cartItems = customer.getCart().getItems();
    assertTrue(cartItems.containsKey(bananas));
    assertEquals(2, cartItems.get(bananas));
  }

  @Test
  public void testRemoveItemCompletelyFromCart() {
    Customer customer = new Customer("C123");
    Inventory inventory = new Inventory();

    Item oranges = new Item("Oranges", 4.50, "oranges");
    inventory.addItem(oranges, 5);

    customer.addItemToCart(inventory, "oranges", 5);
    customer.removeItemFromCart(oranges, 5);

    Map<Item, Integer> cartItems = customer.getCart().getItems();
    assertFalse(cartItems.containsKey(oranges));
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
