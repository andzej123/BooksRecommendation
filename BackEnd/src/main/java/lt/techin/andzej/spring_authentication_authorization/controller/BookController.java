package lt.techin.andzej.spring_authentication_authorization.controller;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/books")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @GetMapping("/books")
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/books/{id}")
    public Book getBookById(@PathVariable Integer id) {
        return bookService.getBookById(id);
    }

    @DeleteMapping("/books/{id}")
    public void deleteBook(@PathVariable Integer id) {
        bookService.deleteBook(id);
    }

    @PatchMapping("/books/{id}")
    public Book updateBook(@PathVariable Integer id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @GetMapping("/books/search")
    public List<Book> getFilteredBooksByName(@RequestParam String name) {
        return bookService.filterBooksByName(name);
    }

    @GetMapping("/books/searchcategory")
    public List<Book> getFilteredBooksByCategory(@RequestParam Integer id) {
        return bookService.filterBooksByCategory(id);
    }

    @GetMapping("/books/searchcategoryandname")
    public List<Book> getFilteredBooksByCategoryAndName(@RequestParam String name, @RequestParam Integer id) {
        return bookService.filterBooksByNameAndCategory(name, id);
    }
}
