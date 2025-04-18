package q1.team1.exceptions;

public class ItemNotFoundException extends RuntimeException {

    public ItemNotFoundException() {}
    
    public ItemNotFoundException(String message) {
        super(message);
  }

}
