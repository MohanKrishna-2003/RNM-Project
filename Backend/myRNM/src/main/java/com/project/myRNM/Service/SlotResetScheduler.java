package com.project.myRNM.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class SlotResetScheduler {

    @Autowired
    private CenterService centerService;

    // it is main here actually so I have set to "0 0 0 * * " which means every day at night 12.00am
    // it will be reset to their original slots
    @Scheduled(cron = "0 0 0 * * *")
    public void resetSlots() {
        centerService.resetSlotsToOriginal();
        System.out.println("Slots have been reset to their original values like real time here...");
    }
}