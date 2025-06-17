package com.iforddow.authsuite.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "theme_settings")
public class ThemeSetting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 7)
    @Column(name = "primary_color", length = 7)
    private String primaryColor;

    @Size(max = 7)
    @Column(name = "secondary_color", length = 7)
    private String secondaryColor;

    @Size(max = 7)
    @Column(name = "tertiary_color", length = 7)
    private String tertiaryColor;

    @Size(max = 255)
    @Column(name = "logo_url")
    private String logoUrl;

    @Size(max = 255)
    @Column(name = "favicon_url")
    private String faviconUrl;

    @Column(name = "last_updated")
    private Instant lastUpdated;

    @Column(name = "last_updated_by")
    private UUID lastUpdatedBy;

}