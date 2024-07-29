package lt.techin.andzej.spring_authentication_authorization.repository;

import lt.techin.andzej.spring_authentication_authorization.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
