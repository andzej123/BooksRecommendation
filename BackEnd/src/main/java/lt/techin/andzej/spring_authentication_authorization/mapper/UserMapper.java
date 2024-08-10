package lt.techin.andzej.spring_authentication_authorization.mapper;

import lt.techin.andzej.spring_authentication_authorization.model.User;
import lt.techin.andzej.spring_authentication_authorization.model.UserResponseDto;

public class UserMapper {
    public static UserResponseDto userToUserResponseDto(User user) {
        return new UserResponseDto(
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole(),
                user.getFavoriteBooks(),
                user.getComments()
        );
    }
}
