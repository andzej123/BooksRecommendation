package lt.techin.andzej.spring_authentication_authorization.repository;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Integer> {

    @Query(
            """
                    Select count(r) from Rating r where r.user.id = :userId and r.book.id = :bookId
                    """
    )
    Integer containsRating(@Param("userId") Integer userId, @Param("bookId") Integer bookId);

    @Query("""
            Select count(r) from Rating r where r.book.id = :bookId
            """)
    Integer ratingsCount(@Param("bookId") Integer bookId);

    @Query("""
            Select r from Rating r where r.user.id = :userId and r.book.id = :bookId
            """)
    Rating findRatingByUserIdAndBookId(@Param("userId") Integer userId, @Param("bookId") Integer bookId);

    @Query("""
            Select avg(rating) from Rating r where r.book.id = :bookId
            """)
    Double getBookRating(@Param("bookId") Integer bookId);
}
