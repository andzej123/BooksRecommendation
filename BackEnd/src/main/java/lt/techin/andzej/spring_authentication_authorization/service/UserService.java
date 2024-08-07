package lt.techin.andzej.spring_authentication_authorization.service;

import lt.techin.andzej.spring_authentication_authorization.exceptions.BookNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.mapper.UserMapper;
import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.User;
import lt.techin.andzej.spring_authentication_authorization.model.UserResponseDto;
import lt.techin.andzej.spring_authentication_authorization.repository.BookRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    private BookRepository bookRepository;

    @Autowired
    public UserService(UserRepository userRepository, BookRepository bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    public ResponseEntity<List<Book>> addBookToFavorite(String username, Integer bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new BookNotFoundException("Book with given id is not found")
        );
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Given username was not found")
        );
        List<Book> favoriteBooks = user.getFavoriteBooks();
        if (favoriteBooks == null) {
            favoriteBooks = new ArrayList<>();
        }
        if (!favoriteBooks.contains(book)) {
            favoriteBooks.add(book);
        }
        user.setFavoriteBooks(favoriteBooks);
        userRepository.save(user);
        return new ResponseEntity<>(favoriteBooks, HttpStatus.OK);
    }

    public ResponseEntity<List<Book>> deleteBookFromFavorite(String username, Integer bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new BookNotFoundException("Book with given id is not found")
        );
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Given username was not found")
        );
        List<Book> favoriteBooks = user.getFavoriteBooks();
        favoriteBooks.remove(book);
        user.setFavoriteBooks(favoriteBooks);
        userRepository.save(user);
        return new ResponseEntity<>(favoriteBooks, HttpStatus.OK);
    }

    public Boolean isBookFavorited(String username, Integer bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new BookNotFoundException("Book with given id is not found")
        );
        List<Book> favoritedBooks = userRepository.findByUsername(username).orElseThrow(
                () -> new BookNotFoundException("Book with given id is not found")
        ).getFavoriteBooks();
        return favoritedBooks.contains(book);
    }

    public UserResponseDto getUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Given username was not found")
        );
        return UserMapper.userToUserResponseDto(user);
    }

    public List<Book> getUsersFavoriteBooks(String username) {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Given username was not found")
        ).getFavoriteBooks();
    }
}
