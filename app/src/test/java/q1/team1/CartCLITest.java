package q1.team1;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.PrintStream;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CartCLITest {

  private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
  private final PrintStream originalOut = System.out;
  private final InputStream originalIn = System.in;

  @BeforeEach
  public void setUp() {
    System.setOut(new PrintStream(outContent));
  }

  @AfterEach
  public void tearDown() {
    System.setOut(originalOut);
    System.setIn(originalIn);
    outContent.reset();
  }

  //   @Test
  //   public void testAddItemAndViewCart() {
  //     String input =
  //         String.join(
  //             "\n",
  //             "1", // Add item
  //             "001", // ID
  //             "Apple", // Name
  //             "0.99", // Price
  //             "2", // Quantity
  //             "3", // View cart
  //             "4" // Exit
  //             );
  //     System.setIn(new ByteArrayInputStream(input.getBytes()));
  //     CartCLI.main(new String[] {});

  //     String output = outContent.toString();
  //     assertTrue(output.contains("Item added to cart."));
  //     assertTrue(output.contains("Apple x 2") || output.toLowerCase().contains("apple x 2"));
  //     assertTrue(output.contains("Total items: 2"));
  //     assertTrue(output.contains("Total price: $1.98"));
  //  }

  //   @Test
  //   public void testRemoveItemFromCart() {
  //     String input =
  //         String.join(
  //             "\n",
  //             "1", // Add item
  //             "002", // ID
  //             "Banana", // Name
  //             "0.59", // Price
  //             "3", // Quantity
  //             "2", // Remove item
  //             "Banana", // Name to remove
  //             "3", // Quantity to remove
  //             "3", // View cart
  //             "4" // Exit
  //             );
  //     System.setIn(new ByteArrayInputStream(input.getBytes()));
  //     CartCLI.main(new String[] {});

  //     String output = outContent.toString();
  //     assertTrue(output.contains("Item removed."));
  //     assertTrue(output.contains("Cart is empty."));
  //   }

  @Test
  public void testRemoveNonexistentItem() {
    String input =
        String.join(
            "\n",
            "2", // Remove item
            "Orange", // Not in cart
            "3", // View cart
            "4" // Exit
            );
    System.setIn(new ByteArrayInputStream(input.getBytes()));
    CartCLI.main(new String[] {});

    String output = outContent.toString();
    assertTrue(output.contains("Item not found in cart."));
    assertTrue(output.contains("Cart is empty."));
  }

  @Test
  public void testInvalidOptionAndExit() {
    String input =
        String.join(
            "\n",
            "7", // Invalid option
            "4" // Exit
            );
    System.setIn(new ByteArrayInputStream(input.getBytes()));
    CartCLI.main(new String[] {});

    String output = outContent.toString();
    assertTrue(output.contains("Invalid option"));
    assertTrue(output.contains("Goodbye!"));
  }

  //   @Test
  //   public void testPartialRemoval() {
  //     String input =
  //         String.join(
  //             "\n",
  //             "1", // Add item
  //             "003", // ID
  //             "Mango", // Name
  //             "1.50", // Price
  //             "4", // Quantity
  //             "2", // Remove item
  //             "Mango", // Name
  //             "2", // Quantity to remove
  //             "3", // View cart
  //             "4" // Exit
  //             );
  //     System.setIn(new ByteArrayInputStream(input.getBytes()));
  //     CartCLI.main(new String[] {});

  //     String output = outContent.toString();
  //     assertTrue(output.contains("Mango x 2"));
  //     assertTrue(output.contains("Total items: 2"));
  //     assertTrue(output.contains("Total price: $3.00"));
  //   }
  // }
}
