package com.talknow.message.controller;

import com.talknow.message.constants.ContentConstants;
import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ContentRequestDto;
import com.talknow.message.dto.ResponseDto;
import com.talknow.message.service.IContentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping(value = "api/message", produces = {MediaType.APPLICATION_JSON_VALUE})
@CrossOrigin(origins = "http://localhost:5000")
@MessageMapping("/sendMessage/{channelId}")  // Client sends to /app/sendMessage/{channelId}
@SendTo("/topic/channel/{channelId}")
public class ContentController {

    private final SimpMessagingTemplate messagingTemplate;
    private final IContentService contentService;

    /**
     * REST endpoint to create a message and send it to a WebSocket topic.
     */
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createMessage(
            @RequestBody ContentRequestDto contentRequestDto,
            @RequestHeader("Authorization") String apiKey) {
        try {
            // Create the message
            ContentDto createdContent = contentService.createMessage(contentRequestDto, apiKey);

            // Dynamically send the message to the relevant WebSocket topic
            String channelId = contentRequestDto.getChannelId();
            messagingTemplate.convertAndSend("/topic/channel/" + channelId, createdContent);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ResponseDto(ContentConstants.statusCode200, ContentConstants.statusCode201, createdContent));
        } catch (Exception e) {
            log.error("Error creating message", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(ContentConstants.errorCreatingMessage, ContentConstants.statusCode500, null));
        }
    }

    /**
     * WebSocket handler for sending messages directly to all subscribers of a topic.
     */
    @MessageMapping("/sendMessage/{channelId}")
    @SendTo("/topic/channel/{channelId}")
    public ContentDto sendMessageToChannel(
            ContentRequestDto contentRequestDto, @PathVariable String channelId) {
        log.info("WebSocket message received for channel: {}", channelId);
        return contentService.createMessage(contentRequestDto, null); // Optional: Pass apiKey if needed
    }

    /**
     * REST endpoint to retrieve messages by channel ID.
     */
    @GetMapping("/channel/{id}")
    public ResponseEntity<ResponseDto> getMessagesByChannelId(@PathVariable String id) {
        try {
            log.info("Fetching messages for channel: {}", id);
            List<ContentDto> messages = contentService.getMessageByChannelId(id);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseDto(ContentConstants.gotAllMessagesFromChannel, ContentConstants.statusCode200, messages));
        } catch (Exception e) {
            log.error("Error fetching messages for channel", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto(ContentConstants.errorGettingMessage, ContentConstants.statusCode500, null));
        }
    }
}