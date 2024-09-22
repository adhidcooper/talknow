package com.talknow.message.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ChannelNotFoundException extends RuntimeException {
    public ChannelNotFoundException(String message) {
      super(message);
    }
}
