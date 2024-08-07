package lt.techin.andzej.spring_authentication_authorization.controller;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.UserResponseDto;
import lt.techin.andzej.spring_authentication_authorization.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/favoritebooks/{username}/{bookId}")
    public ResponseEntity<List<Book>> addBookToFavorites(@PathVariable String username, @PathVariable Integer bookId) {
        return userService.addBookToFavorite(username, bookId);
    }

    @DeleteMapping("/favoritebooks/{username}/{bookId}")
    public ResponseEntity<List<Book>> deleteBookFromFavorite(@PathVariable String username, @PathVariable Integer bookId) {
        return userService.deleteBookFromFavorite(username, bookId);
    }

    @GetMapping("/favoritebooks/{username}/{bookId}")
    public boolean isBookFavorited(@PathVariable String username, @PathVariable Integer bookId) {
        return userService.isBookFavorited(username, bookId);
    }

    @GetMapping("/user/{username}")
    public UserResponseDto getUser(@PathVariable String username) {
        return userService.getUser(username);
    }

    @GetMapping("/user/{username}/favoritebooks")
    public List<Book> getUsersFavoriteBooks(@PathVariable String username) {
        return userService.getUsersFavoriteBooks(username);
    }
}
