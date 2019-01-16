package com.fairpay.backend.controllers;

import com.fairpay.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("coffee")
public class CoffeeController {
    private StatusService statusService;

    @Autowired
    public CoffeeController(StatusService statusService) { this.statusService = statusService; }

    @PutMapping("/{id}")
    public void order(@PathVariable int id, HttpServletRequest request) {
        statusService.setOrdered(id);
    }
}
