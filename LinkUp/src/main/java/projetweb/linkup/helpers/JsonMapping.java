package projetweb.linkup.helpers;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public  abstract class JsonMapping {

    private JsonMapping() {}

    public    static String EntryToJson(String attributename,String attributevalue) {
        return "\"" + attributename + "\" : " + attributevalue;
    }





}
