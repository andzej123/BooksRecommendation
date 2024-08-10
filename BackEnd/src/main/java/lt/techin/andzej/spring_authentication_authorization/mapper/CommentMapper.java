package lt.techin.andzej.spring_authentication_authorization.mapper;

import lt.techin.andzej.spring_authentication_authorization.model.Comment;
import lt.techin.andzej.spring_authentication_authorization.model.CommentResponseDto;

public class CommentMapper {

    public static CommentResponseDto commentToCommentResponseDto(Comment comment) {
        return new CommentResponseDto(
                comment.getId(),
                comment.getMessage(),
                comment.getUser().getId(),
                comment.getUser().getUsername(),
                comment.getBook().getId()
        );
    }
}
