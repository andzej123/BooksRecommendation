package lt.techin.andzej.spring_authentication_authorization.service;

import lt.techin.andzej.spring_authentication_authorization.exceptions.BookNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Rating;
import lt.techin.andzej.spring_authentication_authorization.model.User;
import lt.techin.andzej.spring_authentication_authorization.repository.BookRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.RatingRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class RatingService {

    private final RatingRepository ratingRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Autowired
    public RatingService(RatingRepository ratingRepository,
                         BookRepository bookRepository,
                         UserRepository userRepository) {
        this.ratingRepository = ratingRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    public Rating addRating(Integer bookId, String username, Integer rating) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new BookNotFoundException("Book with this id not found - " + bookId)
        );
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Given username was not found")
        );
        Integer count = ratingRepository.containsRating(user.getId(), bookId);
        Rating tempRating;
        if (count == 0) {
            tempRating = new Rating();
            tempRating.setRating(rating);
            tempRating.setBook(book);
            tempRating.setUser(user);
        } else {
            tempRating = ratingRepository.findRatingByUserIdAndBookId(user.getId(), bookId);
            tempRating.setRating(rating);
        }
        ratingRepository.save(tempRating);
        return tempRating;
    }

    public Integer getBookRating(Integer bookId) {
        Double rating = ratingRepository.getBookRating(bookId);
        return rating == null ? 0 : (int) Math.floor(rating);
    }

    public boolean checkIfUserAlreadyVoted(Integer bookId, String username) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new BookNotFoundException("Book with this id not found - " + bookId)
        );
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Given username was not found")
        );
        Integer count = ratingRepository.containsRating(user.getId(), book.getId());
        return count != 0;
    }

    public Integer getRatingsCount(Integer bookId) {
        return ratingRepository.ratingsCount(bookId);
    }
}
