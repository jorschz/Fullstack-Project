package com.backEndSpring.backEndSpring.Service;

import com.backEndSpring.backEndSpring.entity.Warehouse;
import com.backEndSpring.backEndSpring.repository.InventoryRepository;
import com.backEndSpring.backEndSpring.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WarehouseService {

    @Autowired
    private WarehouseRepository warehouseRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    public Warehouse register(Warehouse warehouse) throws Exception {

        //Create a new instance of Warehouse
        Warehouse warehouseData = new Warehouse();

        if (warehouse.getName() == null || warehouse.getName().isEmpty()) {
            throw new Exception("Name is required");
        }

        if (warehouse.getAnimal() == null) {
            throw new Exception("Dog or Cat");
        }

        warehouse.setAnimal(warehouse.getName().toLowerCase());

        if (!warehouse.getAnimal().equals("dog") && !warehouse.getAnimal().equals("cat")) {
            throw new IllegalArgumentException("Filling in the animal is mandatory. Choose cat or dog.");
        }

        if (warehouseRepository.existsByName(warehouse.getName())) {
            throw new Exception("Name already registered, choose another name for the warehouse");
        }

        //Configure the attributes of warehouseData based on the received data
        warehouseData.setName(warehouse.getName());
        warehouseData.setAnimal(warehouse.getAnimal());

        warehouseData.setStatus(true);

        //Save the warehouse instance in the repository and return the saved instance
        return warehouseRepository.save(warehouseData);
    }

    public Warehouse changeStatus(Long id) {

        Warehouse warehouse = warehouseRepository.findById(id).get();
        if (warehouse == null || warehouse.getStatus() == false) {
            throw new RuntimeException("Warehouse not found or already deactivated");
        }

        long activeInventory = inventoryRepository.CountCheckActiveWarehouse(id);
        if (activeInventory > 0) {
            throw new RuntimeException("Cannot deactivate a warehouse with active inventory");
        } else {
            warehouse.setStatus(false);
        }

        return warehouseRepository.save(warehouse);
    }

    public List<Warehouse> findAll() {
        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return warehouseRepository.findAll(sort);
    }

    public Warehouse findById(Long id) throws Exception {
        Optional<Warehouse> optionalWarehouse = warehouseRepository.findById(id);
        if (optionalWarehouse.isEmpty()) {
            throw new Exception("Warehouse not found");
        }

        return optionalWarehouse.get();
    }

    public Warehouse updateStatus(Long id) {
        Warehouse warehouse = warehouseRepository.findById(id).get();
        if (warehouse == null || warehouse.getStatus() == false) {
            throw new RuntimeException("Warehouse not found or is already deactivated");
        }

        return warehouseRepository.save(warehouse);
    }

    public Warehouse update(Warehouse warehouse) throws Exception {
        Warehouse warehouseData = warehouseRepository.findById(warehouse.getId()).get();

        if (warehouseData == null) {
            throw new RuntimeException("Warehouse not found");
        }

        if (warehouse.getName() == null || warehouse.getName().isEmpty()) {
            throw new Exception("Name is mandatory");
        }

        if (warehouse.getAnimal() == null) {
            throw new Exception("Dog or Cat?");
        }

        if (warehouse.getName().equals(warehouseData.getName()) == false && warehouseRepository.existsByName(warehouse.getName())) {
            throw new Exception("Name already registered, choose another name for the warehouse");
        }

        warehouse.setAnimal(warehouse.getAnimal().toLowerCase());

        if (!warehouse.getAnimal().equals("dog") && !warehouse.getAnimal().equals("cat")) {
            throw new IllegalArgumentException("Filling in the animal is mandatory. Choose cat or dog.");
        }

        warehouseData.setName(warehouse.getName());
        warehouseData.setAnimal(warehouse.getAnimal());

        return warehouseRepository.save(warehouseData);
    }
}
