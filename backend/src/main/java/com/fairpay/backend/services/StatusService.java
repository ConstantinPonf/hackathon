package com.fairpay.backend.services;

import com.fairpay.backend.other.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {
    private Status state;

    @Autowired
    public StatusService() {state = new Status(); }

    public boolean getOrdered() {
        return state.getOrdered();
    }

    public boolean getIdRead() {
        return state.getIdRead();
    }

    public void setOrdered(int id) {
        state.setOrdered(id);
    }

    public void setId(String id) {
        state.setId(id);
    }

    public void reset(){
        state.reset();
    }

    @Override
    public String toString(){
        return state.toString();
    }
}
