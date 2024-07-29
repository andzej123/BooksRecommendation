package lt.techin.andzej.spring_authentication_authorization.service;

import jakarta.annotation.PostConstruct;
import lt.techin.andzej.spring_authentication_authorization.exceptions.CategoryNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Category;
import lt.techin.andzej.spring_authentication_authorization.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    @Autowired
    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    @PostConstruct
    private void postConstruct() {
        Category horror = new Category();
        horror.setName("Horror");
        Category action = new Category();
        action.setName("Action");
        Category comedy = new Category();
        comedy.setName("Comedy");
        repository.save(horror);
        repository.save(action);
        repository.save(comedy);
    }

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category findCategoryById(Integer id) {
        return repository.findById(id).orElseThrow(
                () -> new CategoryNotFoundException("Category not found with id - " + id)
        );
    }

    public Category addCategory(Category request) {
        Category category = new Category();
        category.setName(request.getName());
        return repository.save(category);
    }

    public void deleteCategory(Integer id) {
        repository.deleteById(id);
    }

    public Category updateCategory(Integer id, Category requestCategory){
        Category category = repository.findById(id).orElseThrow(
                () -> new CategoryNotFoundException("Not found")
        );
        category.setName(requestCategory.getName());
        repository.save(category);
        return category;
    }

    public Category getCategoryById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new CategoryNotFoundException("Not found"));
    }
}
