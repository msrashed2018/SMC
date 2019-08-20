package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.almostkbal.web.services.workflow.entities.EyeMeasure;
import com.almostkbal.web.services.workflow.entities.EyeRevealSetting;

//@RepositoryRestResource(collectionResourceRel = "cities", path = "cities")
public interface EyeRevealSettingRepository extends JpaRepository<EyeRevealSetting, Long> {

//	@Query("SELECT c FROM EyeRevealSetting c WHERE c.name ")
	EyeRevealSetting findByRightMeasureAndLeftMeasureAndUseGlassesAndDistinguishColorAndSquint(
			EyeMeasure rightEyeMeasure, EyeMeasure leftEyeMeasure, byte useGlassess, byte distinguishColor,
			byte squint);
}
