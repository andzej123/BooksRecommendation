package lt.techin.andzej.spring_authentication_authorization.repository;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
