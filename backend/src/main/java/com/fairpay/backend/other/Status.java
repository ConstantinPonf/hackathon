package com.fairpay.backend.other;

public class Status {
    private boolean ordered = false;
    private boolean idRead = false;

    private int coffeeOrdered = -1;
    private String id;

    public Status() {}

    public boolean getOrdered() { return ordered; }
    public boolean getIdRead() { return idRead; }

    public void setOrdered(int coffeeOrdered) {
        ordered = true;
        this.coffeeOrdered = coffeeOrdered;
    }

    public void setId(String id) {
        idRead = true;
        this.id = id;
        if(idRead && ordered) {
            idRead = false;
            ordered = false;
            // TODO: Transfer.
        }
    }

    public int getCoffeeOrdered() { return coffeeOrdered; }

    public String getId() { return id; }
}
