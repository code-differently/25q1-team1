package q1.team1;

public interface IInventory {
boolean reserveItem(String itemId, int quantity);
  void addItem(Item item, Integer quantity);
  void addStock(String itemId, Integer quantity);
  Item getItem(String itemId);
  int getStockOfItem(String itemId);
}
