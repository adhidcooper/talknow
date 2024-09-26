package com.talknow.message.service.impl;

import com.talknow.message.dto.UserDto;
import com.talknow.message.exception.UserNotLoggedInException;
import com.talknow.message.service.IAuthUserService;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
@AllArgsConstructor

public class AuthUserServiceImpl implements IAuthUserService {
    private RestTemplate restTemplate;
    @Override
    public UserDto getCurrentUser(String api_key) {
        HttpHeaders headers = new HttpHeaders();
        String url = "http://127.0.0.1:5001/api/user/";
        String token = api_key;
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<UserDto> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                UserDto.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return response.getBody();
        } else if (response.getStatusCode() == HttpStatus.UNAUTHORIZED) {
            throw new UserNotLoggedInException("User Not Logged In");
        } else {
            throw new RuntimeException("Failed to fetch User Details");
        }
    }


}
