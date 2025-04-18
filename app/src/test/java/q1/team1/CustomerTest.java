package q1.team1;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

public class CustomerTest {

    @Test
    public void testAddItemToCart() {
        Customer customer = new Customer("C123");
        customer.addItemToCart("Apples");

        List<String> cart = customer.getCart();
        assertTrue(cart.contains("Apples"));
    }

    @Test
    public void testRemoveItemFromCart() {
        Customer customer = new Customer("C123");
        customer.addItemToCart("Bananas");

        boolean removed = customer.removeItemFromCart("Bananas");
        assertTrue(removed);
        assertFalse(customer.getCart().contains("Bananas"));
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