package com.backEndSpring.backEndSpring.controls;

import com.backEndSpring.backEndSpring.Service.DashboardService;
import com.backEndSpring.backEndSpring.dto.AnimalStatistics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/statistics")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class DashboardControl {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("{animal}/{category}")
    public AnimalStatistics getPuppyQuantity(@PathVariable String animal, @PathVariable String category){

        animal = animal.toLowerCase();
        category = category.toLowerCase();

        if(!animal.equals("dog") && !animal.equals("cat")){
            throw new IllegalArgumentException("Filling in the animal is mandatory. Choose either cat or dog.");
        }

        if(!category.equals("young") && !category.equals("adult")){
            throw new IllegalArgumentException("Invalid category");
        }

        long total = dashboardService.countAnimals(animal, category);
        long totalWithAntiFleas = dashboardService.countByTypeAndAntiFleas(animal, category);
        long totalWithAntiParasitic = dashboardService.countByTypeOfAntiparasitic(animal, category);
        long totalPetFood = dashboardService.calculateTotalPetFoodByType(animal, category);

        return new AnimalStatistics(total, totalWithAntiFleas, totalWithAntiParasitic, totalPetFood);
    }
}
