package com.github.unknownUserless.filters;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
public class WebConfig {

    @Bean
    public FilterRegistrationBean<CORSFilter> CorsFilter() {
        FilterRegistrationBean<CORSFilter> filterRegBean = new FilterRegistrationBean<>();
        filterRegBean.setFilter(new CORSFilter());
        filterRegBean.addUrlPatterns("/*");
        filterRegBean.setOrder(Ordered.LOWEST_PRECEDENCE -1);
        return filterRegBean;
    }

}
