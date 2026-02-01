package projetweb.linkup.helpers;

public  abstract class JsonMapping {

    private JsonMapping() {}

    private static String toKey(String attributename,String attributevalue) {
        return "\"" + attributename + "\" : " + attributevalue;
    }
}
