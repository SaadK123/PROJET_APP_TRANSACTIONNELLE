package projetweb.linkup;

import org.hibernate.annotations.Parameter;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class TestController {

        @GetMapping("/api/health")
        public String health() { return "OK"; }

        @GetMapping("/api/healths")
        public String verifyParam(@RequestParam String s) {
                return "34324";
        }

        @PostMapping("/api/createUser")
        public void createUser() {

        }


        public class MapParser {

                private HashMap<String,Class<?>> childrens;


        }

}
