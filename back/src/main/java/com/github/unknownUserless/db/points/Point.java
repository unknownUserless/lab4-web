package com.github.unknownUserless.db.points;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity
@Table(name = "points")
public class Point implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnoreProperties("id")
    private Long id;

    private float x;
    private float y;
    private float r;
    private boolean result;
    private String owner;

    public Point(){}

    public Point(float x, float y, float r, boolean result, String owner){
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.owner = owner;
    }


}
