package com.talknow.message.dto;

import lombok.Data;

import java.util.Optional;

@Data
public class UserDto {
    private String message;
    private Optional<Object> result;
}

