package projetweb.linkup.Util;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Configuration
public class SecuriteConfiguration {

   @Bean
   public PasswordEncoder encodeur() {
      return new BCryptPasswordEncoder();
   }

   @Bean
   public SecurityFilterChain chaineSecurite(HttpSecurity http) throws Exception {
      return http
              .cors(Customizer.withDefaults())
              .csrf(csrf -> csrf.disable())
              .authorizeHttpRequests(auth -> auth
                      .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                      .requestMatchers(
                              "/api/etudiant/auth",
                              "/api/etudiants",
                              "/v3/api-docs/**",
                              "/swagger-ui/**",
                              "/swagger-ui.html",
                              "/error"
                      ).permitAll()
                      .anyRequest().permitAll()
              )
              .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
              .build();
   }

   @Bean
   public JwtEncoder jwtEncoder(@Value("${jwt.secret}") String secret) {
      byte[] secretBytes = obtenirSecretBytes(secret);
      return new NimbusJwtEncoder(new ImmutableSecret<>(secretBytes));
   }

   @Bean
   public JwtDecoder jwtDecoder(@Value("${jwt.secret}") String secret) {
      byte[] secretBytes = obtenirSecretBytes(secret);

      SecretKey cle = new SecretKeySpec(
              secretBytes,
              "HmacSHA256"
      );

      return NimbusJwtDecoder.withSecretKey(cle)
              .macAlgorithm(MacAlgorithm.HS256)
              .build();
   }

   private byte[] obtenirSecretBytes(String secret) {
      if (secret == null || secret.length() < 32) {
         throw new IllegalArgumentException("jwt.secret doit contenir au moins 32 caracteres");
      }

      return secret.getBytes(StandardCharsets.UTF_8);
   }
}