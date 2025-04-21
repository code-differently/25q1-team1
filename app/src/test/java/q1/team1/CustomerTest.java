package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class CustomerTest {

  @Test
  public void testAddItemToCart() {
    Customer customer = new Customer("C123");
    IInventory inventory = new Inventory();
    Cart cart = new Cart("CART001", "C123");

    Item apples = new Item("Red apples", 5.00, "apples");
    inventory.addItem(apples, 10);

    customer.addItemToCart(inventory, "apples", 5, cart);
    assertEquals(5, cart.getItems().get(apples));
  }

  @Test
  public void testRemoveItemFromCart() {
    Customer customer = new Customer("C123");
    IInventory inventory = new Inventory();
    Cart cart = new Cart("CART001", "C123");

    Item bananas = new Item("Bananas", 5.00, "bananas");
    inventory.addItem(bananas, 10);

    customer.addItemToCart(inventory, "bananas", 5, cart);
    customer.removeItemFromCart(bananas, 3, cart);
    assertEquals(2, cart.getItems().get(bananas));
    customer.removeItemFromCart(bananas, 2, cart);
    assertFalse(cart.getItems().containsKey(bananas));
  }

  @Test
  public void testSetAndGetCustomerId() {
    Customer customer = new Customer("C123");
    customer.setCustomerId("C999");
    assertEquals("C999", customer.getCustomerId());
  }

  @Test
  public void testCartInitiallyEmpty() {
    Cart cart = new Cart("CART001", "C123");
    assertTrue(cart.isEmpty());
  }
}
