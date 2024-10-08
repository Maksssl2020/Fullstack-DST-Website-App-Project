package com.dst.websiteprojectbackendspring.authentication;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {

    @NotEmpty(message = "Username cannot be empty!")
    @NotBlank(message = "Username cannot be blank!")
    private String username;

    @NotEmpty(message = "Password cannot be empty!")
    @NotBlank(message = "Password cannot be blank!")
    private String password;

    @JsonCreator
    public AuthenticationRequest(@JsonProperty("username") String username,
                                 @JsonProperty("password") String password) {
        this.username = username;
        this.password = password;
    }
}
