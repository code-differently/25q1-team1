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
}
