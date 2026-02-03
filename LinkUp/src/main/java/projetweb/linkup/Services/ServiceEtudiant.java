package projetweb.linkup.Services;


import org.springframework.stereotype.Service;
import projetweb.linkup.DB_SERVICES.RelaiEtudiant;

import java.util.HashMap;

@Service
public class ServiceEtudiant {


    private static ServiceEtudiant service = null;



    private ServiceEtudiant() {

    }

    public final HashMap<String,RelaiEtudiant> GETS = new HashMap<>() {{

    }} ;// TODO

    public final RelaiEtudiant CREATE = (obj) -> {
        return null;
    };

}
