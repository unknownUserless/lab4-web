package com.github.unknownUserless.users;

import com.github.unknownUserless.Message;
import com.github.unknownUserless.PasswordMaker;
import com.github.unknownUserless.db.users.User;
import com.github.unknownUserless.db.users.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UsersController {

    @Autowired
    private UsersRepository users;

    @RequestMapping(value = "/api/users", method = RequestMethod.POST)
    public Message logreg(@RequestBody String body){

        GsonJsonParser parser = new GsonJsonParser();
        Map<String, Object> params = parser.parseMap(body);
        String type = params.getOrDefault("type", "").toString();
        String login = params.getOrDefault("login", "").toString();
        String password = params.getOrDefault("password", "").toString();


        if (type.equals("registration")){
            return register(login, password);
        } else if (type.equals("login")){
            return login(login, password);
        } else {
            return new Message("Неизвестный тип: " + type, true);
        }
    }

    private Message register(String login, String password){
        try {
            if (users.isUserExists(login)) {
                return new Message("Пользователь с таким логином уже зарегестрирован", true);
            } else {
                String pass = PasswordMaker.getHexDigest(password);
                User user = new User(login, pass);
                String token = user.token();
                users.save(user);
                return new Message("Вы успешно зарегестрировались", false, token);
            }
        } catch (SQLException e){
            e.printStackTrace();
            return new Message("Проблемы с бд", true);
        }
    }

    private Message login(String login, String password){
        try {
            if (users.isUserExists(login)) {
                String pass = PasswordMaker.getHexDigest(password);
                if (users.isPasswordCorrect(login, pass)) {
                    String token = users.getByLogin(login).getToken();
                    return new Message("Вы успешно авторизовались", false, token);
                } else {
                    return new Message("Пароль не подошел", true);
                }

            } else {
                return new Message("Пользователь с данным логином не найден", true);
            }
        } catch (SQLException e){
            e.printStackTrace();
            return new Message("Проблемы с бд", true);
        }
    }

    @RequestMapping(path = "/api/auth", method = RequestMethod.GET)
    public Map<String, String> auth(@RequestHeader(name = "token") String token){
        Map<String, String> map = new HashMap<>();
        if (users.getByToken(token) != null){
            map.put("auth", "successful");
        } else {
            map.put("auth", "failed");
        }
        return map;
    }

}