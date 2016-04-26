package com.github.unkindest.repositories;

import com.github.unkindest.entities.Bill;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by paul on 26.04.16.
 */

@RepositoryRestResource(collectionResourceRel = "bill", path = "bill")
public interface BillRepository extends CrudRepository<Bill , Integer> {}
