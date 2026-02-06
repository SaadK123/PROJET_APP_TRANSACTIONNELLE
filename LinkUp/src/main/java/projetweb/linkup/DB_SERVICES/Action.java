package projetweb.linkup.DB_SERVICES;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import projetweb.linkup.Interfaces.JsonEntity;
import projetweb.linkup.entity.Etudiant;

import javax.swing.text.html.parser.Entity;
import java.util.HashMap;
import java.util.Optional;



@Repository
public interface Action<T>{

    Optional<T> Execute(HashMap<String,String> data);


}
