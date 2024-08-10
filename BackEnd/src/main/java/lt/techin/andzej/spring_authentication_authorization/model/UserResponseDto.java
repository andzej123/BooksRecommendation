package lt.techin.andzej.spring_authentication_authorization.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserResponseDto {
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private Role role;
    private List<Book> favoriteBooks;
    private List<Comment> comments;

    public UserResponseDto(String username,
                           String firstName,
                           String lastName,
                           String email,
                           Role role,
                           List<Book> favoriteBooks,
                           List<Comment> comments) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
        this.favoriteBooks = favoriteBooks;
        this.comments = comments;
    }
}
