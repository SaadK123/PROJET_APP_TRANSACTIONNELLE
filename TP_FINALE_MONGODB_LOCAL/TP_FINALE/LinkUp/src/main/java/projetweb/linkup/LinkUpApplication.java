package projetweb.linkup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import java.util.List;

@SpringBootApplication
public class LinkUpApplication {

    public static void main(String[] args) {
        SpringApplication.run(LinkUpApplication.class, args);


    }




}
