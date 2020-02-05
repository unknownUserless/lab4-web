package com.github.unknownUserless;

import lombok.Data;

@Data
public class Message {
    private String message;
    private boolean error;
    private String token;

    public Message(String message, boolean error){
        this.message = message;
        this.error = error;
    }

    public Message(String message, boolean error, String token){
        this(message, error);
        this.token = token;
    }

}
