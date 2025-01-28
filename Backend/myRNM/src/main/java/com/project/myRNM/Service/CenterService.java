package com.project.myRNM.Service;

import com.project.myRNM.Entity.Center;
import com.project.myRNM.Repository.CenterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CenterService {

    @Autowired
    private CenterRepository centerRepository;

    // Add a new Center
    public Center addCenter(Center center) {
        center.setOriginalMorningSlots(center.getMorningSlots());
        center.setOriginalAfternoonSlots(center.getAfternoonSlots());
        center.setOriginalEveningSlots(center.getEveningSlots());
        return centerRepository.save(center);
    }

    // Get all Centers
    public List<Center> getAllCenters() {
        return centerRepository.getCenter();
    }

    // Get Center by ID
    public Center getCenterById(Long id) {
        Optional<Center> center = centerRepository.findById(id);
        return center.orElse(null);  // Return null if not found
    }


    // Reset all slots to their original values
    public void resetSlotsToOriginal() {
        List<Center> centers = centerRepository.findAll();
        for (Center center : centers) {
            center.setMorningSlots(center.getOriginalMorningSlots());
            center.setAfternoonSlots(center.getOriginalAfternoonSlots());
            center.setEveningSlots(center.getOriginalEveningSlots());
            center.setAvailableSlots(
                    center.getMorningSlots() + center.getAfternoonSlots() + center.getEveningSlots()
            );
            centerRepository.save(center);
        }
    }
}
