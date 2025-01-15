package com.project.myRNM.Repository;


import com.project.myRNM.Entity.SlotBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SlotBookingRepository extends JpaRepository<SlotBooking, String> {

}
