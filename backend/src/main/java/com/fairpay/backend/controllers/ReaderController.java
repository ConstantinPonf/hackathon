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
    public ReaderController(StatusService statusService) {
        this.statusService = statusService;
    }

    @PostMapping("/uid")
    public boolean getTest(@RequestBody byte[] bytes) {
        if (!statusService.getIdRead() && statusService.getOrdered()) {
            String uid = new String(bytes);
            uid = uid.substring(12, 23);
            String temp = "0x";
            for (String s : uid.split("\\+")) {
                temp += s;
            }
            uid = temp;
            statusService.setId(uid);
            return true;
        }
        return false;
    }
}
