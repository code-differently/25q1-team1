package q1.team1;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

import org.junit.jupiter.api.AfterEach;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CartCLITest {

  private final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
  private final PrintStream originalOut = System.out;
  private final PrintStream originalErr = System.err;
  private final java.io.InputStream originalIn = System.in;

  @BeforeEach
  public void setUpStreams() {
    System.setOut(new PrintStream(outContent));
    System.setErr(new PrintStream(outContent));
  }

  @AfterEach
  public void restoreStreams() {
    System.setOut(originalOut);
    System.setErr(originalErr);
    System.setIn(originalIn);
  }

//   @Test
//   public void testAddAndViewCartFlow() {
//     String input =
//         String.join(
//             "\n",
//             "1", // Add item
//             "10", // Item ID
//             "Mango", // Name
//             "1.50", // Price
//             "3", // Quantity
//             "3", // View cart
//             "4" // Exit
//             );
//     System.setIn(new ByteArrayInputStream(input.getBytes()));

//     CartCLI.main(new String[] {});

//     String output = outContent.toString();
//     System.out.println("Captured output:\n" + output); // Debug line

//     assertTrue(output.contains("Mango"), "Expected item name to appear");
//     assertTrue(output.contains("x 3"), "Expected quantity to appear");
//     assertTrue(output.contains("Total items: 3"), "Expected total item count");
//     assertTrue(
//         output.contains("Total price: $4.5") || output.contains("Total price: $4.50"),
//         "Expected total price to match");
//   }
 
  @Test
  public void testInvalidOptionAndExit() {
    String input = String.join("\n", "9", "4");
    System.setIn(new ByteArrayInputStream(input.getBytes()));

    CartCLI.main(new String[] {});

    String output = outContent.toString();
    assertTrue(output.contains("Invalid option"));
    assertTrue(output.contains("Goodbye!"));
  }
}
