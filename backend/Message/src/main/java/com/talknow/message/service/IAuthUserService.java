package com.talknow.message.service;

import com.talknow.message.dto.UserDto;

public interface IAuthUserService {
    UserDto getCurrentUser(String api_key);
}
