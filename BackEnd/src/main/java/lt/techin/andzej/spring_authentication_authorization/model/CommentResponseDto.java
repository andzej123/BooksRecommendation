package lt.techin.andzej.spring_authentication_authorization.model;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponseDto {

    private Integer id;

    private String message;

    private Integer UserId;

    private String username;

    private Integer bookId;

    public CommentResponseDto(Integer id, String message, Integer userId, String username, Integer bookId) {
        this.id = id;
        this.message = message;
        UserId = userId;
        this.username = username;
        this.bookId = bookId;
    }
}
