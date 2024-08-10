package lt.techin.andzej.spring_authentication_authorization.service;

import lt.techin.andzej.spring_authentication_authorization.exceptions.BookNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.exceptions.CommentNotFoundException;
import lt.techin.andzej.spring_authentication_authorization.mapper.CommentMapper;
import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Comment;
import lt.techin.andzej.spring_authentication_authorization.model.CommentResponseDto;
import lt.techin.andzej.spring_authentication_authorization.model.User;
import lt.techin.andzej.spring_authentication_authorization.repository.BookRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.CommentRepository;
import lt.techin.andzej.spring_authentication_authorization.repository.UserRepository;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(UserRepository userRepository, BookRepository bookRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.commentRepository = commentRepository;
    }

    public CommentResponseDto addComment(Comment request) {
        User user = userRepository.findByUsername(request.getUser().getUsername()).orElseThrow(
                () -> new UsernameNotFoundException("No user found")
        );
        Book book = bookRepository.findById(request.getBook().getId()).orElseThrow(
                () -> new BookNotFoundException("Book not found")
        );
        Comment comment = new Comment();
        comment.setMessage(request.getMessage());
        comment.setBook(book);
        comment.setUser(user);
        commentRepository.save(comment);
        return CommentMapper.commentToCommentResponseDto(comment);
    }

    public List<CommentResponseDto> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream().map(CommentMapper::commentToCommentResponseDto).collect(Collectors.toList());
    }

    public List<CommentResponseDto> findCommentsByBookId(Integer id) {
        List<Comment> comments = commentRepository.findCommentsByBookId(id);
        return comments.stream().map(CommentMapper::commentToCommentResponseDto).collect(Collectors.toList());
    }

    public Integer findCommentsSizeByBookId(Integer id) {
        return commentRepository.findCommentsByBookId(id).size();
    }

    public ResponseEntity<Comment> deleteCommentbyId(Integer id) {
        commentRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public CommentResponseDto getComment(Integer id) {
        Comment comment = commentRepository.findById(id).orElseThrow(
                () -> new CommentNotFoundException("Comment with given id not found")
        );
        return CommentMapper.commentToCommentResponseDto(comment);
    }

    public CommentResponseDto updateComment(Integer id, Comment comment) {
        Comment tempComment = commentRepository.findById(id).orElseThrow(
                () -> new CommentNotFoundException("Comment with given id not found")
        );
        tempComment.setMessage(comment.getMessage());
        commentRepository.save(tempComment);
        return CommentMapper.commentToCommentResponseDto(tempComment);
    }
}
