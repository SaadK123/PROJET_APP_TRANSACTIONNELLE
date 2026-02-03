package projetweb.linkup.Interfaces;

import java.util.HashMap;

/**
 * json entity implements the method toDto to give it back as a dto
 */
public interface JsonEntity {
   HashMap<String,String> toDto();
}
