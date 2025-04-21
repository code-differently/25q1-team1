package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import q1.team1.exceptions.ItemNotFoundException;

public class CartTest {

  private Cart cart;
  private Item apple;
  private Item banana;

  @BeforeEach
  public void setUp() {
    cart = new Cart("CART001", "CUSTOMER123");
    apple = new Item("1", 0.99, "Apple");
    banana = new Item("2", 0.59, "Banana");
  }

  @Test
  public void testAddItem() {
    cart.addItem(apple, 3);
    assertEquals(3, cart.getItems().get(apple));
    assertEquals(3, cart.getTotalItems());
  }

  @Test
  public void testAddMultipleItems() {
    cart.addItem(apple, 2);
    cart.addItem(banana, 5);
    assertEquals(7, cart.getTotalItems());
    assertEquals(2 * 0.99 + 5 * 0.59, cart.getTotalPrice(), 0.01);
  }

  @Test
  public void testRemoveItemPartially() throws Exception {
    cart.addItem(apple, 5);
    cart.removeItem(apple, 2);
    assertEquals(3, cart.getItems().get(apple));
  }

  @Test
  public void testRemoveItemCompletely() throws Exception {
    cart.addItem(apple, 3);
    cart.removeItem(apple, 3);
    assertFalse(cart.getItems().containsKey(apple));
  }

  @Test
  public void testRemoveMoreThanExists() throws Exception {
    cart.addItem(apple, 2);
    cart.removeItem(apple, 5); // should remove completely
    assertFalse(cart.getItems().containsKey(apple));
  }

  @Test
  public void testIsEmpty() throws Exception {
    assertTrue(cart.isEmpty());
    cart.addItem(apple, 1);
    assertFalse(cart.isEmpty());
    cart.removeItem(apple, 1);
    assertTrue(cart.isEmpty());
  }

  @Test
  public void testCartIds() {
    assertEquals("CART001", cart.getCartId());
    assertEquals("CUSTOMER123", cart.getCustomerId());
  }

  @Test
  public void testPrintCartWhenEmpty() {
    cart.printCart(); // should go through the "Cart is empty" branch
  }

  @Test
  public void testPrintCartWithItems() {
    cart.addItem(apple, 2);
    cart.addItem(banana, 1);
    cart.printCart(); // should go through the "print all item details" branch
  }

  @Test
  public void testAddItem_InvalidArguments() {
    // null item
    assertThrows(
        IllegalArgumentException.class,
        () -> {
          cart.addItem(null, 2);
        });

    // quantity <= 0
    assertThrows(
        IllegalArgumentException.class,
        () -> {
          cart.addItem(apple, 0);
        });

    assertThrows(
        IllegalArgumentException.class,
        () -> {
          cart.addItem(apple, -1);
        });
  }

  @Test
  public void testRemoveItem_ItemNotInCart() {
    assertThrows(
        ItemNotFoundException.class,
        () -> {
          cart.removeItem(banana, 1); // banana was never added
        });
  }
}
