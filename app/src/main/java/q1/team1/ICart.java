package q1.team1;

import java.util.Map;

public interface ICart {
  void addItem(Item item, int quantity);

  void removeItem(Item item, int quantity) throws Exception;

  boolean isEmpty();

  Map<Item, Integer> getItems();
}
