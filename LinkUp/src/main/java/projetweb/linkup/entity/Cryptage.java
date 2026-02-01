package projetweb.linkup.entity;


import java.util.Base64;

import java.nio.charset.StandardCharsets;


public class Cryptage {

   public static String encode(String text) {
      if (text == null) return null;
      return Base64.getUrlEncoder()
              .withoutPadding()
              .encodeToString(text.getBytes(StandardCharsets.UTF_8));
   }

   public static String decode(String encodedText) {
      if (encodedText == null) return null;
      byte[] decodedBytes = Base64.getUrlDecoder().decode(encodedText);
      return new String(decodedBytes, StandardCharsets.UTF_8);
   }
}

