package com.github.unknownUserless.db.users;

import java.sql.SQLException;

public interface UsersCustomRepository {
    boolean isUserExists(String login) throws SQLException;
    boolean isPasswordCorrect(String login, String password) throws SQLException;
}
