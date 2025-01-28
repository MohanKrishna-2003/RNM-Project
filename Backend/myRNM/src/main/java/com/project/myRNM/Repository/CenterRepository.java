package com.project.myRNM.Repository;

import com.project.myRNM.Entity.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CenterRepository extends JpaRepository<Center, Long> {
    List<Center> findByBrandId(Long brandId);

    @Query("select c from Center c")
    public List<Center> getCenter();
}
