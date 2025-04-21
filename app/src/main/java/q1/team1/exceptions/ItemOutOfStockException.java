package q1.team1.exceptions;

public class ItemOutOfStockException extends RuntimeException {

  public ItemOutOfStockException() {}

  public ItemOutOfStockException(String message) {
    super(message);
  }
}
