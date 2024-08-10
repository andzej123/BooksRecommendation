package lt.techin.andzej.spring_authentication_authorization.exceptions;

public class CommentNotFoundException extends RuntimeException {

    public CommentNotFoundException(String message) {
        super(message);
    }
}
