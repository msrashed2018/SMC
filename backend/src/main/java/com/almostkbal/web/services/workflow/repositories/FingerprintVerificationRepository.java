package com.almostkbal.web.services.workflow.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.almostkbal.web.services.workflow.entities.FingerprintVerification;

public interface FingerprintVerificationRepository extends JpaRepository<FingerprintVerification, Long> {


	FingerprintVerification findByFingerprintCitizenIdAndVerifierUsername(Long citizenId, String username);

	FingerprintVerification findByVerifierUsername(String username);

//	@Modifying
//    @Query("delete from FingerprintVerification f where f.fingerprint.citizen.id = :citizenId OR f.verifier.username=:username")
//	Long deleteByFingerprintCitizenIdOrVerifierUsername(Long citizenId, String username);
	@Modifying
	Long deleteByVerifierUsername(String username);

}
