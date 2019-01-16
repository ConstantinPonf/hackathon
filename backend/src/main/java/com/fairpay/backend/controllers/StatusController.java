package com.fairpay.backend.controllers;

import com.fairpay.backend.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("service")
public class StatusController {
    private StatusService statusService;

    @Autowired
    public StatusController(StatusService statusService) { this.statusService = statusService; }

    @GetMapping("/ordered")
    public boolean getOrdered(HttpServletRequest request) {
        return statusService.getOrdered();
    }

    @GetMapping("/idRead")
    public boolean getIdRead(HttpServletRequest request) {
        return statusService.getIdRead();
    }
}
