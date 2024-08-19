package lt.techin.andzej.spring_authentication_authorization.controller;

import lt.techin.andzej.spring_authentication_authorization.model.Book;
import lt.techin.andzej.spring_authentication_authorization.model.Comment;
import lt.techin.andzej.spring_authentication_authorization.model.CommentResponseDto;
import lt.techin.andzej.spring_authentication_authorization.repository.CommentRepository;
import lt.techin.andzej.spring_authentication_authorization.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/comments")
    public CommentResponseDto addComment(@RequestBody Comment comment) {
        return commentService.addComment(comment);
    }

    @GetMapping("/comments")
    public List<CommentResponseDto> getAllComments() {
        return commentService.getAllComments();
    }

    @GetMapping("/comments/{bookId}")
    public List<CommentResponseDto> findCommentsByBookId(@PathVariable Integer bookId) {
        return commentService.findCommentsByBookId(bookId);
    }

    @GetMapping("/comment/{commentId}")
    public CommentResponseDto findCommentById(@PathVariable Integer commentId) {
        return commentService.getComment(commentId);
    }

    @PatchMapping("/comment/{commentId}")
    public CommentResponseDto updateComment(@PathVariable Integer commentId, @RequestBody Comment comment) {
        return commentService.updateComment(commentId, comment);
    }

    @GetMapping("/comments/{bookId}/length")
    public Integer getCommentsSizeByBookId(@PathVariable Integer bookId) {
        return commentService.findCommentsSizeByBookId(bookId);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Comment> deleteCommentById(@PathVariable Integer commentId) {
        return commentService.deleteCommentbyId(commentId);
    }
}
