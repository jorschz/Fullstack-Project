package com.backEndSpring.backEndSpring.controls;

import com.backEndSpring.backEndSpring.Service.InventoryService;
import com.backEndSpring.backEndSpring.entity.Inventory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "inventory")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InventoryControl {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<Inventory>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(inventoryService.findAll());
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(inventoryService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody Inventory inventory) {
        try {
            Inventory inventorySaved = inventoryService.save(inventory);
            return ResponseEntity.ok().body(inventorySaved);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("{id}")
    public ResponseEntity edit(@PathVariable Long id, @RequestBody Inventory editedInventory) throws Exception {

        Inventory inventory = inventoryService.findById(id);

        if(inventory == null){
            return ResponseEntity.notFound().build();
        }

        inventory.setProduct(editedInventory.getProduct());
        inventory.setQuantity(editedInventory.getQuantity());

        try {
            inventoryService.editProduct(inventory);
            Inventory updatedInventory = inventoryService.findById(id);
            return ResponseEntity.ok(updatedInventory);
        } catch (Exception e){
            return ResponseEntity.badRequest().body("Error while editing the Inventory");
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id){
        inventoryService.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }




























}
