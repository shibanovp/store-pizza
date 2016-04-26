package com.github.unkindest.repositories;

import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

/**
 * Created by paul on 26.04.16.
 */

@RepositoryRestResource(collectionResourceRel = "pizzaBase", path = "pizzabase")
public interface PizzaBaseRepository extends CrudRepository<PizzaBase, Integer> {
//    List<PizzaBase> findByName(@Param("name") String name);
}
