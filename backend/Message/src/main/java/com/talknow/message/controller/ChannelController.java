package com.talknow.message.controller;

import com.talknow.message.constants.ContentConstants;
import com.talknow.message.dto.ChannelDto;
import com.talknow.message.dto.MembersDto;
import com.talknow.message.dto.ResponseDto;
import com.talknow.message.entity.Members;
import com.talknow.message.service.IChannelService;
import com.talknow.message.service.IMembersService;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/channel", produces = {MediaType.APPLICATION_JSON_VALUE})
public class ChannelController {

    private final IChannelService channelService;


    @Autowired
    public ChannelController(IChannelService contentService) {
        this.channelService = contentService;
    }

    private static final String AUTHORIZATION_HEADER = "Authorization";

    // Create a new channel
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping(value = "/create")
    public ResponseEntity<ResponseDto> createChannel (@RequestBody ChannelDto channelDto,@RequestHeader("Authorization") String api_key) {
        ChannelDto createdChannel = channelService.createChannel(channelDto, api_key);
//        String id = createdChannel.getChannelId();

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(ContentConstants.channelCreatedMsg, ContentConstants.statusCode201, createdChannel));
    }

    // Get a channel by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto> getChannelById (@PathVariable String id) {
        ChannelDto channelDto = channelService.getChannelById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.getChannelMsg,ContentConstants.statusCode200, channelDto));
    }

    @GetMapping("/get+{channelName}")
    public ResponseEntity<ResponseDto> getChannelByName(@PathVariable String channelName) {
        ChannelDto channelDto = channelService.getChannelByName(channelName);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.getChannelMsg,ContentConstants.statusCode200, channelDto));
    }

    // Get all channels
    @CrossOrigin(origins = "http://localhost:5173/")
    @GetMapping(value = "/all")
    public ResponseEntity<ResponseDto> getAllChannels() {
        List<ChannelDto> channels = channelService.getAllChannels();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.fetchedChannelsMsg,ContentConstants.statusCode200, channels));
    }

    // Update a channel by ID
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDto> updateChannel(@PathVariable String id, @RequestBody ChannelDto channelDto, @RequestHeader("Authorization") String api_key) {
        ChannelDto updatedChannel = channelService.updateChannel(id, channelDto, api_key);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.updatedChannelDetailsMsg, ContentConstants.statusCode200, updatedChannel));
    }

    // Delete a channel by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDto> deleteChannel (@PathVariable String id) {
        ChannelDto channelItem = channelService.deleteChannel(id);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(ContentConstants.deletedChannelMsg, ContentConstants.statusCode200, channelItem.getChannelName()));
    }
}