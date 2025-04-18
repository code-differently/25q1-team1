package q1.team1;

public class Item {
    private String name;
    private double cost;
    private String id;

    public Item(String name, double cost, String id) {
        this.name = name;
        this.cost = cost;
        this.id = id;
    }

    // Getters
    public String getName() { return name; }
    public double getCost() { return cost; }
    public String getID() { return id; }

    // Setters
    public void setName(String name) { this.name = name; }
    public void setCost(double cost) { this.cost = cost; }
    public void setID(String id) { this.id = id; }
    
}
