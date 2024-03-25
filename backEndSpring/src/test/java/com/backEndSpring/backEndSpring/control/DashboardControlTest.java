package com.backEndSpring.backEndSpring.control;

import com.backEndSpring.backEndSpring.Service.DashboardService;
import com.backEndSpring.backEndSpring.controls.DashboardControl;
import com.backEndSpring.backEndSpring.dto.AnimalStatistics;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class DashboardControlTest {

    @Mock
    private DashboardService dashboardService;

    @InjectMocks
    private DashboardControl dashboardControl;

    @Test
    public void testGetStatistics() {
        // Test Data
        String animal = "dog";
        String category = "puppy";
        long totalAnimals = 10;
        long totalAntiFleas = 5;
        long totalAntiParasitic = 3;
        long totalPetFood = 5;


        //Define the behavior of the mock.
        when(dashboardService.countAnimals(animal, category)).thenReturn(totalAnimals);
        when(dashboardService.countByTypeAndAntiFleas(animal, category)).thenReturn(totalAntiFleas);
        when(dashboardService.countByTypeOfAntiparasitic(animal, category)).thenReturn(totalAntiParasitic);
        when(dashboardService.calculateTotalPetFoodByType(animal, category)).thenReturn(totalPetFood);

        //Execute the method to be tested
        AnimalStatistics statistics = dashboardControl.getPuppyQuantity(animal, category);

        //Verify the results
        assertEquals(totalAnimals, statistics.getTotal());
        assertEquals(totalAntiFleas, statistics.getTotalWithAntiFleas());
        assertEquals(totalAntiParasitic, statistics.getTotalWithAntiParasitic());
        assertEquals(totalPetFood, statistics.getTotalPetFood());

    }
}
