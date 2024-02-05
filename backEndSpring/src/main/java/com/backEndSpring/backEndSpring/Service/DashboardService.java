package com.backEndSpring.backEndSpring.Service;

import com.backEndSpring.backEndSpring.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public long countAnimals(String animal, String category){
        Long sum = inventoryRepository.countByAnimalType(animal, category);
        if(sum != null){
            return sum;
        }
        return 0;
    }

    public long countByTypeAndAntiFleas(String animal, String category){
        Long sum = inventoryRepository.countByType(animal, category, "antiFleas");
        if(sum != null){
            return sum;
        }
        return 0;
    }

    public long countByTypeOfAntiparasitic(String animal, String category){
        Long sum = inventoryRepository.countByType(animal, category, "antiparasitic");
        if(sum != null){
            return sum;
        }
        return 0;
    }

    public long calculateTotalPetFoodByType(String animal, String category){
        Long sum = inventoryRepository.countByType(animal, category, "pet food");
        if(sum != null){
            return sum;
        }
        return 0;
    }
}
