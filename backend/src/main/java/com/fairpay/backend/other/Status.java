package com.fairpay.backend.other;

public class Status {
    private boolean ordered = false;
    private boolean idRead = false;

    private int coffeeOrdered = -1;
    private String id;

    public Status() {
    }

    public boolean getOrdered() {
        return ordered;
    }

    public boolean getIdRead() {
        return idRead;
    }

    public void setOrdered(int coffeeOrdered) {
        if (!ordered) {
            ordered = true;
            this.coffeeOrdered = coffeeOrdered;
        }
    }

    public void setId(String id) {
        if (!idRead) {
            idRead = true;
            this.id = id;
        }
    }

    public int getCoffeeOrdered() {
        return coffeeOrdered;
    }

    public String getId() {
        return id;
    }

    public void reset() {
        this.id = "";
        this.coffeeOrdered = -1;
        this.ordered = false;
        this.idRead = false;

    }

    @Override
    public String toString(){
        String result = "";
        result += "Ordered: " + ordered +"\n";
        result += "Ordered Coffe ID: "+coffeeOrdered+"\n";
        result += "Did Read Client ID: " + idRead +"\n";
        result += "Client ID: "+id+"\n";
        return result;
    }
}
