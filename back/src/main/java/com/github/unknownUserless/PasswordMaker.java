package com.github.unknownUserless;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordMaker {

    public static String getHexDigest(String string) {
        try {
            MessageDigest msg = MessageDigest.getInstance("MD5");
            byte[] bytes = msg.digest(string.getBytes());
            StringBuilder builder = new StringBuilder();
            for (byte b : bytes) {
                builder.append(String.format("%02x", b));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }

}
