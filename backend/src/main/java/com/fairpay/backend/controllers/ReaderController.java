package com.fairpay.backend.controllers;

import com.fairpay.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("reader")
public class ReaderController {
    private StatusService statusService;

    @Autowired
    public ReaderController(StatusService statusService) { this.statusService = statusService; }

    @PutMapping("/{uid}")
    public boolean setUID(@PathVariable String uid, HttpServletRequest request) {
        return true;
    }

    @GetMapping("/ordered")
    public boolean getOrdered() {
        return statusService.getOrdered();
    }
}
