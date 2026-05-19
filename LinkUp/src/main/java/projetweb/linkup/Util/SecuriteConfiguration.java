package projetweb.linkup.Util;

import com.nimbusds.jose.jwk.source.ImmutableSecret;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
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
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
public class SecuriteConfiguration {

   private static final String NOM_COOKIE_TOKEN = "token";

   @Bean
   public PasswordEncoder encodeur() {
      return new BCryptPasswordEncoder();
   }

   @Bean
   public SecurityFilterChain chaineSecurite(HttpSecurity http) throws Exception {
      return http
              .cors(cors -> cors.configurationSource(request -> {
                 CorsConfiguration configuration = new CorsConfiguration();

                 configuration.setAllowedOrigins(List.of(
                         "http://localhost:3000",
                         "http://127.0.0.1:3000",
                         "http://localhost:3001"
                 ));

                 configuration.setAllowedMethods(List.of(
                         "GET",
                         "POST",
                         "PUT",
                         "DELETE",
                         "OPTIONS"
                 ));

                 configuration.setAllowedHeaders(List.of("*"));
                 configuration.setAllowCredentials(true);

                 return configuration;
              }))
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
                      .requestMatchers("/api/etudiant/connecte").authenticated()
                      .anyRequest().permitAll()
              )
              .oauth2ResourceServer(oauth2 -> oauth2
                      .bearerTokenResolver(cookieBearerTokenResolver())
                      .jwt(Customizer.withDefaults())
              )
              .build();
   }

   @Bean
   public BearerTokenResolver cookieBearerTokenResolver() {
      return this::extraireTokenDepuisCookie;
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

   private String extraireTokenDepuisCookie(HttpServletRequest request) {
      if (request.getCookies() == null) {
         return null;
      }

      for (Cookie cookie : request.getCookies()) {
         if (NOM_COOKIE_TOKEN.equals(cookie.getName())) {
            return cookie.getValue();
         }
      }

      return null;
   }

   private byte[] obtenirSecretBytes(String secret) {
      if (secret == null || secret.length() < 32) {
         throw new IllegalArgumentException("jwt.secret doit contenir au moins 32 caracteres");
      }

      return secret.getBytes(StandardCharsets.UTF_8);
   }
}