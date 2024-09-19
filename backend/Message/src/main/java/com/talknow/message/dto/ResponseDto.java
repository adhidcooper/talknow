package com.talknow.message.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Data @AllArgsConstructor @NoArgsConstructor
public class ResponseDto {
    private String statusCode;
    private String statusMsg;
    private Object data;
}
