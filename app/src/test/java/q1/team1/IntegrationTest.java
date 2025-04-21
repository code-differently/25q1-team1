package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import q1.team1.exceptions.ItemNotFoundException;
import q1.team1.exceptions.ItemOutOfStockException;

public class IntegrationTest {

  private IInventory inventory;
  private ICart cart;
  private Customer customer;
  private Employee employee;

  @BeforeEach
  public void setUp() {
    inventory = new Inventory();
    cart = new Cart("CART001", "CUST01");
    customer = new Customer("CUST01");
    employee = new Employee("EMP01");
  }

  // USER STORY 1: Customer reserves item successfully
  @Test
  public void testCustomerReserveItemSuccess() {
    Item item = new Item("Apple", 0.99, "001");
    employee.addItem(item, 10, inventory);

    customer.addItemToCart(inventory, "001", 2, cart);

    assertEquals(2, cart.getItems().get(item));
    assertEquals(8, inventory.getStockOfItem("001"));
  }

  // USER STORY 1: Customer tries to reserve more than available
  @Test
  public void testCustomerReserveItemInsufficientStock() {
    Item item = new Item("Apple", 0.99, "001");
    employee.addItem(item, 5, inventory);

    assertThrows(
        ItemOutOfStockException.class,
        () -> {
          customer.addItemToCart(inventory, "001", 10, cart);
        });
  }

  // USER STORY 2: Customer views live stock list
  @Test
  public void testInventoryListAfterStockUpdate() {
    Item milk = new Item("Milk", 3.50, "milk");
    employee.addItem(milk, 5, inventory);

    assertEquals(milk, inventory.getItem("milk"));
    assertEquals(5, inventory.getStockOfItem("milk"));

    employee.addToStock("milk", 5, inventory);
    assertEquals(10, inventory.getStockOfItem("milk"));
  }

  // USER STORY 3: Employee checks stock by ID
  @Test
  public void testEmployeeChecksStockById() {
    Item bread = new Item("Bread", 2.50, "bread");
    employee.addItem(bread, 4, inventory);

    assertEquals(4, inventory.getStockOfItem("bread"));
  }

  // USER STORY 3: Employee searches for missing item
  @Test
  public void testEmployeeSearchesForMissingItem() {
    assertThrows(
        ItemNotFoundException.class,
        () -> {
          inventory.getStockOfItem("missing-id");
        });
  }
}
