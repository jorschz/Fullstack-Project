package com.backEndSpring.backEndSpring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AnimalStatistics {

    private long total;
    private long totalWithAntiFleas;
    private long totalWithAntiParasitic;
    private long totalPetFood;
}
