package q1.team1;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

public class ItemTest {
    @Test
    public void testConstructorAndGetters() {
        Item item = new Item("Apple Juice", 9.99, "NJA4001");

        assertEquals("Apple Juice", item.getName());
        assertEquals(9.99, item.getCost());
        assertEquals("NJA4001", item.getID());
    }

    @Test
    public void testSetters() {
        Item item = new Item("Flour", 10.00, "PPF456");

        item.setName("Baking Flour");
        item.setCost(19.99);
        item.setID("PPF789");

        assertEquals("Baking Flour", item.getName());
        assertEquals(19.99, item.getCost());
        assertEquals("PPF789", item.getID());
    }
}
