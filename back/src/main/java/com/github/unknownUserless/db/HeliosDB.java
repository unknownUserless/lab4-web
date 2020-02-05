package com.github.unknownUserless.db;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Profile("helios")
@Configuration
public class HeliosDB {

    @Bean
    public DataSource getDataSource() {

        DataSourceBuilder dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.postgresql.Driver");
        dataSourceBuilder.url("jdbc:postgresql://pg:5432/studs");
        dataSourceBuilder.username("******");
        dataSourceBuilder.password("******");
        return dataSourceBuilder.build();
    }

}
