package lt.techin.andzej.spring_authentication_authorization.repository;

import lt.techin.andzej.spring_authentication_authorization.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Query("""
            Select c from Comment c where c.book.id = :id
            """)
    List<Comment> findCommentsByBookId(@Param("id") Integer id);
}
