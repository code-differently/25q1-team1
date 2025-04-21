package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class EmployeeTest {

  private Employee employee;
  private IInventory inventory;

  @BeforeEach
  public void setUp() {
    employee = new Employee("123");
    inventory = new Inventory();
  }

  @Test
  public void testAddItem() {
    Item item = new Item("item001", 0, "Laptop");
    employee.addItem(item, 3, inventory);
    assertEquals(3, inventory.getStockOfItem("Laptop"));
  }

  @Test
  public void testAddToStock() {
    Item item = new Item("Mouse", 0, "item002");
    inventory.addItem(item, 0); // Initialize the item in inventory with 0 stock
    employee.addToStock("item002", 2, inventory); // Call the addToStock method
    assertEquals(2, inventory.getStockOfItem("item002")); // Verify stock
  }

  @Test
  public void testSetAndGetEmployeeId() {
    employee.setCustomerId("321"); // Should update employeeId
    assertEquals("321", employee.getCustomerId());
  }
}
