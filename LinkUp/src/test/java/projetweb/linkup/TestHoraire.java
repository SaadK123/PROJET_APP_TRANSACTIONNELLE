package projetweb.linkup;

import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import projetweb.linkup.Services.ServiceHoraire;
import projetweb.linkup.entities.Horaire;

public class TestHoraire {
    Horaire horaire = null;

    @Autowired
    ServiceHoraire service;

    @BeforeEach
    public void InitializeService(){
    }
}
