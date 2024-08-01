package lt.techin.andzej.spring_authentication_authorization.repository;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {


    @Query(
            """
                    Select b from Book b where b.name like %:name%
                    """
    )
    List<Book> findBooksByName(@Param("name") String name);

    @Query("""
            Select b from Book b where b.category.id = :id
            """)
    List<Book> findBooksByCategory(@Param("id") Integer id);

    @Query("""
            Select b from Book b WHERE b.name like %:name% AND b.category.id = :id
            """)
    List<Book> findBooksByNameAndCategory(@Param("name") String name, @Param("id") Integer id);
}
