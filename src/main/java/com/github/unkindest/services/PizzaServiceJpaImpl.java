package com.github.unkindest.services;

import com.github.unkindest.entities.Pizza;
import com.github.unkindest.entities.PizzaBase;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.condition.ProducesRequestCondition;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import java.util.List;

/**
 * Created by paul on 18.04.16.
 */
@Service
public class PizzaServiceJpaImpl implements PizzaService{
    private EntityManagerFactory emf;

    @PersistenceUnit
    public void setEmf(EntityManagerFactory emf) {
        this.emf = emf;
    }
    @Override
    public List<PizzaBase> listAll() {
        EntityManager em = emf.createEntityManager();
        return em.createQuery("from PizzaBase", PizzaBase.class).getResultList();
    }
}
