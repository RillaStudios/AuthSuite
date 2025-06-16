package com.iforddow.authsuite.jpa.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@Embeddable
public class UserFieldValueId implements Serializable {
    @Serial
    private static final long serialVersionUID = 1958403498708378020L;

    @NotNull
    @Column(name = "field_id", nullable = false)
    private Integer fieldId;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserFieldValueId entity = (UserFieldValueId) o;
        return Objects.equals(this.userId, entity.userId) &&
                Objects.equals(this.fieldId, entity.fieldId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, fieldId);
    }

}