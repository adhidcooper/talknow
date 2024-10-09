package com.talknow.message.controller;

import com.talknow.message.constants.ContentConstants;
import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ContentRequestDto;
import com.talknow.message.dto.ResponseDto;
import com.talknow.message.service.IContentService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping(value = "api/message", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "http://localhost:5000")
@MessageMapping("/sendMessage/{channelId}")  // Client sends to /app/sendMessage/{channelId}
@SendTo("/topic/channel/{channelId}")
public class ContentController {

    private final SimpMessagingTemplate messagingTemplate; // WebSocket messaging
    private final IContentService contentService;

    @PostMapping(value = "/create")
    public ResponseEntity<ResponseDto> createMessage (@RequestBody ContentRequestDto contentRequestDto, @RequestHeader("Authorization") String api_key) {
        try {
            ContentDto createdContent = contentService.createMessage(contentRequestDto, api_key);
            messagingTemplate.convertAndSend("/topic/message", createdContent);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDto(ContentConstants.statusCode200,ContentConstants.statusCode201, createdContent));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDto(ContentConstants.errorGettingMessage, ContentConstants.statusCode500, null));
        }
    }

    @GetMapping(value = "/channel/{id}")
    public ResponseEntity<ResponseDto> getMessagesByChannelId (@PathVariable String id) {
        try {
            List<ContentDto> getMessages = contentService.getMessageByChannelId(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.gotAllMessagesFromChannel, ContentConstants.statusCode200, getMessages));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseDto(ContentConstants.errorGettingMessage, ContentConstants.statusCode500, null));
        }
    }

}