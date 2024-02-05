package com.backEndSpring.backEndSpring.Service;

import com.backEndSpring.backEndSpring.entity.Inventory;
import com.backEndSpring.backEndSpring.entity.Warehouse;
import com.backEndSpring.backEndSpring.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private WarehouseService warehouseService;

    public List<Inventory> findAll() {

        Sort sort = Sort.by(Sort.Direction.ASC, "id");
        return inventoryRepository.findAll(sort);
    }


    public Inventory findById(Long id) throws Exception {
        Optional<Inventory> optionalInventory = inventoryRepository.findById(id);
        if (optionalInventory.isEmpty()) {
            throw new Exception("Inventory not found.");
        }

        return optionalInventory.get();
    }

    public Inventory save(Inventory inventory) throws Exception {

        validateInventory(inventory);

        Warehouse warehouse = warehouseService.findById(inventory.getWarehouse().getId());
        if (!checkAnimalAcceptance(warehouse, inventory.getAnimal())) {
            throw new Exception("This warehouse does not accept products for the specified animal.");
        }
        return inventoryRepository.save(inventory);

    }

    public void editProduct(Inventory inventory) {
        if (existsById(inventory.getId()) == false) {
            throw new IllegalArgumentException("Id not found in the inventory");
        }

        inventoryRepository.updateProductAndQuantityById(inventory.getProduct(), inventory.getQuantity(), inventory.getId());
    }

    public void deleteById(Long id) {

        if (existsById(id) == false) {
            throw new IllegalArgumentException("Id not found in the inventory");
        }

        inventoryRepository.deleteById(id);
    }

    public void validateInventory(Inventory inventory) throws Exception {

        if (!isProductTypeValid(inventory.getProduct())) {
            throw new Exception("Invalid product type");
        }

        if (!isAnimalValid(inventory.getAnimal())) {
            throw new Exception("Animal field is mandatory. Choose Dog or Cat");
        }

        if (isCategoryValid(inventory.getCategory())) {
            throw new Exception("Invalid category");
        }
    }

    private boolean isProductTypeValid(String productType) {
        return productType.equals("pet food") || productType.equals("antiparasitic") || productType.equals("fleaControl");
    }

    private boolean isAnimalValid(String animal) {
        return animal.equals("dog") || animal.equals("cat");
    }

    private boolean isCategoryValid(String category) {
        return category.equals("young") || category.equals("adult");
    }

    private boolean checkAnimalAcceptance(Warehouse warehouse, String animal) {
        return warehouse.getAnimal().contains(animal);
    }

    public boolean existsById(Long id) {
        boolean exist = inventoryRepository.existsById(id);
        if (!exist) {
            return false;
        }

        return true;
    }
}
