package lt.techin.andzej.spring_authentication_authorization.controller;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Category;
import lt.techin.andzej.spring_authentication_authorization.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CategoryController {

    private final CategoryService service;

    @Autowired
    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return service.getAllCategories();
    }

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        return service.addCategory(category);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable Integer id) {
        service.deleteCategory(id);
    }

    @PatchMapping("/categories/{id}")
    public Category updateCategory(@PathVariable Integer id, @RequestBody Category category) {
        return service.updateCategory(id, category);
    }

    @GetMapping("/categories/{id}")
    public Category getBookById(@PathVariable Integer id) {
        return service.getCategoryById(id);
    }
}
