package com.github.unknownUserless.db.users;

import com.github.unknownUserless.PasswordMaker;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UsersCustomRepositoryImpl implements UsersCustomRepository {

    @Autowired
    private DataSource dataSource;

    @Override
    public boolean isUserExists(String login) throws SQLException{

        try(Connection connection = dataSource.getConnection();
            PreparedStatement ps = connection.
                    prepareStatement("SELECT * FROM users WHERE login = ?")){

            ps.setString(1, login);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        }

    }

    @Override
    public boolean isPasswordCorrect(String login, String password) throws SQLException{
        try(Connection connection = dataSource.getConnection();
            PreparedStatement ps = connection.
                    prepareStatement("SELECT * FROM users WHERE login = ?")){
            ps.setString(1, login);
            ResultSet rs = ps.executeQuery();
            rs.next();
            return rs.getString("password").equals(password);
        }
    }
}
