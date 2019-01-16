package com.fairpay.backend.controllers;

import com.fairpay.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("reader")
public class ReaderController {
    private StatusService statusService;

    @Autowired
    public ReaderController(StatusService statusService) { this.statusService = statusService; }

    @GetMapping("/ordered")
    public boolean getOrdered() {
        return statusService.getOrdered();
    }
}
