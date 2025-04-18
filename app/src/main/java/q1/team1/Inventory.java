package q1.team1;

import java.util.HashMap;
import java.util.Map;
import q1.team1.exceptions.ItemNotFoundException;

public class Inventory {
  private Map<String, Item> itemByItemID = new HashMap<>();
  private Map<String, Integer> stockByItemId = new HashMap<>();

  public Item getItem(String itemId) {
    if (!stockByItemId.containsKey(itemId)) {
      throw new ItemNotFoundException("Item does not exist");
    }
    return itemByItemID.get(itemId);
  }

  public int getStockOfItem(String itemId) {
    if (!stockByItemId.containsKey(itemId)) {
      throw new ItemNotFoundException("Cannot get stock. Item does not exist");
    }
    return stockByItemId.get(itemId);
  }

  public void addStock(String itemId, Integer quantity) {
    if (!stockByItemId.containsKey(itemId)) {
      throw new ItemNotFoundException("Cannot add stock. Item does not exist");
    }
    stockByItemId.put(itemId, stockByItemId.get(itemId) + quantity);
  }

  public void addItem(Item item, Integer quantity) {
    stockByItemId.put(item.getID(), quantity);
    itemByItemID.put(item.getID(), item);
  }
}
