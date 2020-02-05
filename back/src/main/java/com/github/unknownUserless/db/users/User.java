package com.github.unknownUserless.db.users;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@JsonIgnoreProperties("password")
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;
    private String password;
    private String token;

    public User(){}

    public User(String login, String password){
        this.login = login;
        this.password = password;
    }

    public String token(){
        this.token = UUID.randomUUID().toString();
        return this.token;
    }

    public String getToken(){
        return token;
    }

    public String getLogin(){
        return this.login;
    }

}
