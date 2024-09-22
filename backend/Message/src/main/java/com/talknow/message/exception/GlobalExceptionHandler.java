package com.talknow.message.exception;

import com.talknow.message.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ChannelNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleChannelNotFoundException(ChannelNotFoundException exception, WebRequest webRequest) {
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    webRequest.getDescription(false),
                    HttpStatus.BAD_REQUEST,
                    exception.getMessage(),
                    LocalDateTime.now()
            );
            return new ResponseEntity<>(errorResponseDto, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(UserNotLoggedInException.class)
    public ResponseEntity<ErrorResponseDto> handleUserNotLoggedInException(UserNotLoggedInException exception, WebRequest webRequest) {
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false),
                        HttpStatus.UNAUTHORIZED,
                        exception.getMessage(),
                        LocalDateTime.now()
                );
                return new ResponseEntity<>(errorResponseDto, HttpStatus.UNAUTHORIZED);
    }
}
