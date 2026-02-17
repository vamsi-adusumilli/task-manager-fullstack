package com.vamsi.backend.repository;

import com.vamsi.backend.entity.Task;
import com.vamsi.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    // Find only the tasks belonging to a specific user
    List<Task> findByUser(User user);
}