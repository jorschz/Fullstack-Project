package com.backEndSpring.backEndSpring.controls;

import com.backEndSpring.backEndSpring.Service.WarehouseService;
import com.backEndSpring.backEndSpring.entity.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/warehouse")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class WarehouseControl {

    @Autowired
    private WarehouseService warehouseService;

    @GetMapping
    public ResponseEntity<?> List() {
        try {
            return ResponseEntity.ok(warehouseService.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(warehouseService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> edit(@PathVariable Long id, @RequestBody Warehouse warehouse) {
        try {
            if (id == null) {
                throw new Exception("Choose a warehouse ID");
            }
            warehouse.setId(id);
            return ResponseEntity.ok(warehouseService.update(warehouse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/disable/{id}")
    public ResponseEntity<?> disable(@PathVariable Long id) {
        if (id == null) {
            throw new RuntimeException("Choose a warehouse ID");
        }
        try {
            return ResponseEntity.ok(warehouseService.changeStatus(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
