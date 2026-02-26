package projetweb.linkup;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import projetweb.linkup.DTO.ACTIONS.CreateStudentDTO;
import projetweb.linkup.Services.ServiceEtudiant;
import projetweb.linkup.entities.Etudiant;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TestEtudiant {
            Etudiant etudiant = null;
        final String FIRST_NAME = "Alexis";
        final String LAST_NAME = "Piquant";
        final String USERNAME = "username";
        final String ECOLE = "B";
        final String PASSWORD = "12345";
        final String EMAIL = "Alexis@12345";

        final CreateStudentDTO createStudentDTO = new CreateStudentDTO(FIRST_NAME, LAST_NAME, USERNAME, ECOLE, PASSWORD, EMAIL);

        @Autowired
        ServiceEtudiant service;

        @BeforeEach
        void InitializeEtudiant() {
            etudiant = service.createEtudiant((createStudentDTO));
        }

        @Test
        void verifyUserFirstName() {
            assertEquals(FIRST_NAME, etudiant.getFirstname(), "Error in first name");
        }

        @Test
        void verifyUserLastName() {
            assertEquals(LAST_NAME, etudiant.getLastname(), "Error in last name");
        }

        @Test
        void verifyUsername() {
            assertEquals(USERNAME, etudiant.getUsername(), "Error in username");
        }

        @Test
        void verifyEcole() {
            assertEquals(ECOLE, etudiant.getEcole(), "Error in ecole");
        }

        @Test
        void verifyPassword() {
            assertEquals(PASSWORD, etudiant.getPasswordhash(), "Error in password");
        }

        @Test
        void verifyEmail() {
            assertEquals(EMAIL, etudiant.getEmail(), "Error in email");
    }


}
