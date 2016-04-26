package com.github.unkindest.repositories;

import com.github.unkindest.entities.PizzaBase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


/**
 * Created by paul on 26.04.16.
 */

@RepositoryRestResource(collectionResourceRel = "pizzaBase", path = "pizzabase")
public interface PizzaBaseRepository extends CrudRepository<PizzaBase, Integer> {}

