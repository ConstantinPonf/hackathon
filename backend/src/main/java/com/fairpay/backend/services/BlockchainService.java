package com.fairpay.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlockchainService {

    @Autowired
    public BlockchainService() {}

    public boolean transfer(long coffeeID) {
        // TODO: Get userID of arduino.
        // TODO: Confirm transfer on the Smart Contract.
        return true;
    }
}
