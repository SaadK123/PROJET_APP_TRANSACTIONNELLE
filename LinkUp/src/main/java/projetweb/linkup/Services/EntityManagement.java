package projetweb.linkup.Services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public final class EntityManagement {
    public final static EntityManagement entity = new EntityManagement();
    private EntityManagement() {}
    @PersistenceContext
    public  EntityManager entityManager;
}
