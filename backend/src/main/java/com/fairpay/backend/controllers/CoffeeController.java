package com.fairpay.backend.controllers;

import com.fairpay.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("coffee")
public class CoffeeController {
    private StatusService statusService;

    @Autowired
    public CoffeeController(StatusService statusService) { this.statusService = statusService; }

    @PostMapping("/order")
    public boolean order(@RequestBody int id, HttpServletRequest request) {
        System.out.println("wtf");
        statusService.setOrdered(id);
        return true;
    }
}
