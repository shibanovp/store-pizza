package com.github.unkindest.repositories;

import com.github.unkindest.entities.Pizza;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by paul on 26.04.16.
 */

@RepositoryRestResource(collectionResourceRel = "pizza", path = "pizza")
public interface PizzaRepository extends CrudRepository<Pizza, Integer> {}

