package com.skillswap.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/api/status")
    public Map<String, String> getStatus() {
        return Map.of(
            "status", "UP",
            "message", "SkillSwap Backend REST API is running successfully!"
        );
    }
}
