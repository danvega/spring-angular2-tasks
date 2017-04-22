package com.therealdanvega.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@AllArgsConstructor
public class Task {

    @Id @GeneratedValue
    private Long id;
    private String name;
    private Boolean completed;

    private Task() {

    }

}
