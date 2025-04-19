package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import q1.team1.exceptions.ItemNotFoundException;
import q1.team1.exceptions.ItemOutOfStockException;

public class InventoryTest {

  Item apple;
  Item banana;
  Inventory inventory;

  @BeforeEach
  public void setUp() {
    apple = new Item("Red Apple", 0.99, "Apple01");
    banana = new Item("Large Banana", 0.59, "Banana01");
    inventory = new Inventory();
    inventory.addItem(apple, 10);
  }

  @Test
  public void testGetItem() {
    Item actual = inventory.getItem("Apple01");

    assertEquals(apple, actual);
  }

  @Test
  public void testGetStockOfItem() {
    int actual = inventory.getStockOfItem("Apple01");

    assertEquals(10, actual);
  }

  @Test
  public void testAddStock() {
    inventory.addStock("Apple01", 5);
    int actual = inventory.getStockOfItem("Apple01");

    assertEquals(15, actual);
  }

  @Test
  public void testAddItem() {
    inventory.addItem(banana, 5);
    Item actual1 = inventory.getItem("Apple01");
    Item actual2 = inventory.getItem("Banana01");

    assertEquals(apple, actual1);
    assertEquals(banana, actual2);
  }

  @Test
  public void testReserveItem_Success() {
    boolean reserved = inventory.reserveItem("Apple01", 5);
    assertTrue(reserved);
    assertEquals(5, inventory.getStockOfItem("Apple01"));
  }

  @Test
  public void testReserveItem_ItemNotFoundException() {
    Exception exception =
        assertThrows(
            ItemNotFoundException.class,
            () -> {
              inventory.reserveItem("Strawberry01", 1);
            });
    assertEquals("Item does not exist", exception.getMessage());
  }

  @Test
  public void testReserveItem_ItemOutOfStockException() {
    Exception exception =
        assertThrows(
            ItemOutOfStockException.class,
            () -> {
              inventory.reserveItem("Apple01", 15);
            });
    assertTrue(exception.getMessage().contains("Only 10 in stock."));
  }
}
