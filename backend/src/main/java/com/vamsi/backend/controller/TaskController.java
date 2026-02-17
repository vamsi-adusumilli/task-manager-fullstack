package com.vamsi.backend.controller;

// ✅ CHANGED: Importing from 'entity' instead of 'model' to match your folder
import com.vamsi.backend.entity.Task;
import com.vamsi.backend.entity.User;
import com.vamsi.backend.repository.TaskRepository;
import com.vamsi.backend.repository.UserRepository;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // 1. Get all tasks for the logged-in user
    @GetMapping
    public List<Task> getTasks(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        // Ensure this matches your UserRepository method name (usually findByEmail)
        User user = userRepository.findByEmail(email).orElseThrow();
        return taskRepository.findByUser(user);
    }

    // 2. Create a new task
    @PostMapping
    public Task createTask(@RequestBody Task task, @AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        User user = userRepository.findByEmail(email).orElseThrow();
        task.setUser(user);
        return taskRepository.save(task);
    }

    // 3. Update task (Mark as Done)
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        // Update the status and details
        task.setCompleted(taskDetails.isCompleted());
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());

        return taskRepository.save(task);
    }

    // 4. Delete a task
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
    }
}