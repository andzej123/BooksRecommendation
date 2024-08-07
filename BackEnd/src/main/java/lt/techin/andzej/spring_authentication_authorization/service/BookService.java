package lt.techin.andzej.spring_authentication_authorization.service;

import jakarta.annotation.PostConstruct;
import lt.techin.andzej.spring_authentication_authorization.exceptions.BookNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.exceptions.CategoryNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Category;
import lt.techin.andzej.spring_authentication_authorization.model.Role;
import lt.techin.andzej.spring_authentication_authorization.model.User;
import lt.techin.andzej.spring_authentication_authorization.repository.BookRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.CategoryRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public BookService(BookRepository bookRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Book addBook(Book request) {
        Category category = categoryRepository.findById(request.getCategory().getId()).orElseThrow(
                () -> new CategoryNotFoundException("Not found")
        );
        Book book = new Book();
        book.setName(request.getName());
        book.setDescription(request.getDescription());
        book.setIsbn(request.getIsbn());
        book.setPhotoLink(request.getPhotoLink());
        book.setPagesCount(request.getPagesCount());
        book.setCategory(category);
        bookRepository.save(book);
        return book;
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Integer bookId) {
        return bookRepository.findById(bookId).orElseThrow(() -> new BookNotFoundException("Book with this id not found - " + bookId));
    }

    public void deleteBook(Integer bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow(
                () -> new BookNotFoundException("Book with this id not found - " + bookId)
        );
        List<User> users = userRepository.findAll();
        for (User u : users) {
            List<Book> books = u.getFavoriteBooks();
            books.remove(book);
        }
        bookRepository.deleteById(bookId);
    }

    public Book updateBook(Integer id, Book requestBook) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookNotFoundException("Book with this id not found - " + id));
        Category category = categoryRepository.findById(requestBook.getCategory().getId()).orElseThrow(
                () -> new CategoryNotFoundException("Not found")
        );
        book.setName(requestBook.getName());
        book.setDescription(requestBook.getDescription());
        book.setIsbn(requestBook.getIsbn());
        book.setPhotoLink(requestBook.getPhotoLink());
        book.setPagesCount(requestBook.getPagesCount());
        book.setCategory(category);
        bookRepository.save(book);
        return book;
    }

    public List<Book> filterBooksByName(String name) {
        return bookRepository.findBooksByName(name);
    }

    public List<Book> filterBooksByCategory(Integer id) {
        return bookRepository.findBooksByCategory(id);
    }

    public List<Book> filterBooksByNameAndCategory(String name, Integer id) {
        return bookRepository.findBooksByNameAndCategory(name, id);
    }
}
