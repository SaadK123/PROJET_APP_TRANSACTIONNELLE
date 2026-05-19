package projetweb.linkup.Services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import projetweb.linkup.entities.Etudiant;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
public class ServiceToken {

    private final JwtEncoder jwtEncoder;
    private final int expirationMinutes;

    public ServiceToken(
            JwtEncoder jwtEncoder,
            @Value("${jwt.expiration-minutes}") int expirationMinutes
    ) {
        this.jwtEncoder = jwtEncoder;
        this.expirationMinutes = expirationMinutes;
    }

    public String creerToken(Etudiant etudiant) {
        Instant maintenant = Instant.now();

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("LinkUp")
                .issuedAt(maintenant)
                .expiresAt(maintenant.plus(expirationMinutes, ChronoUnit.MINUTES))
                .subject(etudiant.getId().toString())
                .claim("courriel", etudiant.getCourriel())
                .claim("nomUtilisateur", etudiant.getNomUtilisateur())
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();

        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}