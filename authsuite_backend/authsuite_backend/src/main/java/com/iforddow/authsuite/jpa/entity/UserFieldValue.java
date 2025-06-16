package com.iforddow.authsuite.jpa.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "user_field_value")
public class UserFieldValue {

    @EmbeddedId
    private UserFieldValueId id;

    @MapsId("fieldId")
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "field_id", nullable = false)
    private UserFieldDefinition field;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "value_string", length = Integer.MAX_VALUE)
    private String valueString;

    @Column(name = "value_int")
    private Integer valueInt;

    @Column(name = "value_bool")
    private Boolean valueBool;

    @Column(name = "value_date")
    private Instant valueDate;

    @Column(name = "value_double")
    private Double valueDouble;

    @Column(name = "value_json")
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> valueJson;

}