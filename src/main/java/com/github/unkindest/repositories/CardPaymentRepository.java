package com.github.unkindest.repositories;

import com.github.unkindest.entities.CardPayment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created by paul on 26.04.16.
 */

@RepositoryRestResource(collectionResourceRel = "cardPayment", path = "cardpayment")
public interface CardPaymentRepository extends CrudRepository<CardPayment, Integer> {}
