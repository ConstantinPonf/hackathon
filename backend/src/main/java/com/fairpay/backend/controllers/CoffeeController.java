package com.fairpay.backend.controllers;

import com.fairpay.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("coffee")
public class CoffeeController {
    private StatusService statusService;

    @Autowired
    public CoffeeController(StatusService statusService) { this.statusService = statusService; }

    @PostMapping("/order")
    public boolean order(@RequestBody int id) {
        statusService.setOrdered(id);
        System.out.println(statusService.toString());
        return true;
    }

    @GetMapping("/scanned")
    public boolean scanned(){
        System.out.println(statusService.toString());
        return statusService.getIdRead();
    }

    @GetMapping("/brewed")
    public boolean brewed(){
        statusService.reset();
        System.out.println(statusService.toString());
        return true;
    }
}
