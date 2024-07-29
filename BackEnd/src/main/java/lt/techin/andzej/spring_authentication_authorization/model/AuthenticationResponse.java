package lt.techin.andzej.spring_authentication_authorization.model;


import lombok.Getter;

@Getter
public class AuthenticationResponse {

    private final String token;

    public AuthenticationResponse(String token) {
        this.token = token;
    }
}
