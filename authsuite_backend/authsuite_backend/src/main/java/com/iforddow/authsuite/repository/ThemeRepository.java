package com.iforddow.authsuite.repository;
import com.iforddow.authsuite.jpa.entity.ThemeSetting;
import org.springframework.data.jpa.repository.JpaRepository;

/**
* A repository interface for managing theme settings.
* This interface extends JpaRepository to provide CRUD operations
* for ThemeSetting entities.
*
* @author IFD
* @date 2025-06-19
* */
public interface ThemeRepository extends JpaRepository<ThemeSetting, Integer> {

    ThemeSetting findFirstByOrderByIdDesc();
}
