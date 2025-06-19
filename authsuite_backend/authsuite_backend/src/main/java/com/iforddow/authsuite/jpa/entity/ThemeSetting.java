package com.iforddow.authsuite.jpa.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;

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
    @ColumnDefault("'#20a2fe'")
    @Column(name = "primary_color", length = 7)
    private String primaryColor;

    @Size(max = 7)
    @ColumnDefault("'#3cdb76'")
    @Column(name = "secondary_color", length = 7)
    private String secondaryColor;

    @Size(max = 7)
    @ColumnDefault("'#ff704d'")
    @Column(name = "tertiary_color", length = 7)
    private String tertiaryColor;

    @Size(max = 255)
    @ColumnDefault("'/logo.png'")
    @Column(name = "logo_url")
    private String logoUrl;

    @Size(max = 255)
    @ColumnDefault("'/favicon.ico'")
    @Column(name = "favicon_url")
    private String faviconUrl;

    @Column(name = "last_updated")
    private Instant lastUpdated;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.SET_NULL)
    @JoinColumn(name = "last_updated_by")
    private User lastUpdatedBy;

    @Size(max = 100)
    @ColumnDefault("'DM Sans'")
    @Column(name = "title_font", length = 100)
    private String titleFont;

    @Size(max = 100)
    @ColumnDefault("'Roboto'")
    @Column(name = "body_font", length = 100)
    private String bodyFont;

}