package com.talknow.message.controller;

import com.talknow.message.constants.ContentConstants;
import com.talknow.message.dto.ChannelDto;
import com.talknow.message.dto.MembersDto;
import com.talknow.message.dto.ResponseDto;
import com.talknow.message.entity.Members;
import com.talknow.message.service.IChannelService;
import com.talknow.message.service.IMembersService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.Authorization;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "api/channel", produces = {MediaType.APPLICATION_JSON_VALUE})
public class ChannelController {

    private final IChannelService channelService;


    @Autowired
    public ChannelController(IChannelService contentService) {
        this.channelService = contentService;
    }


    // Create a new channel
    @CrossOrigin(origins = "http://localhost:5000")
    @PostMapping(value = "/create")
    public ResponseEntity<ResponseDto> createChannel (@RequestBody ChannelDto channelDto,@RequestHeader("Authorization") String api_key) {
        ChannelDto createdChannel = channelService.createChannel(channelDto, api_key);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(ContentConstants.channelCreatedMsg, ContentConstants.statusCode201, createdChannel));
    }

    // Get a channel by ID
    @CrossOrigin(origins = "http://localhost:5000")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDto> getChannelById (@PathVariable String id) {
        ChannelDto channelDto = channelService.getChannelById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.getChannelMsg,ContentConstants.statusCode200, channelDto));
    }

    @CrossOrigin(origins = "http://localhost:5000")
    @GetMapping("/get+{channelName}")
    public ResponseEntity<ResponseDto> getChannelByName(@PathVariable String channelName) {
        ChannelDto channelDto = channelService.getChannelByName(channelName);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.getChannelMsg,ContentConstants.statusCode200, channelDto));
    }

    @CrossOrigin(origins = "http://localhost:5000/")
    @GetMapping("/user-channels")
    public List<ChannelDto> getUserChannels(@RequestHeader("Authorization") String api_key) {
        return channelService.getChannelsUserIn(api_key);
    }

    // Get all channels
    @CrossOrigin(origins = "http://localhost:5000/")
    @GetMapping(value = "/all")
    public ResponseEntity<ResponseDto> getAllChannels() {
        List<ChannelDto> channels = channelService.getAllChannels();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(ContentConstants.fetchedChannelsMsg,ContentConstants.statusCode200, channels));
    }

    // Update a channel by ID
    @CrossOrigin(origins = "http://localhost:5000")
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

    @CrossOrigin(origins = "http://localhost:5000")
    @PostMapping("/join/{id}")
    public ResponseEntity<ResponseDto> joinChannel (@PathVariable String id, @RequestHeader("Authorization") String api_key) {
        MembersDto joinChannel = channelService.joinChannel(id, api_key);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(ContentConstants.joinChannelMessage, ContentConstants.statusCode200, joinChannel));
    }

    @CrossOrigin(origins = "http://localhost:5000")
    @GetMapping("/channel_users/{channelId}")
    public ResponseEntity<ResponseDto> getUserIdsFromChannelId(@PathVariable String channelId) {
        try {
            // Call the service method to fetch user data by channel ID
            List<String> userData = channelService.getUserIdsFromChannel(channelId);
            return ResponseEntity.ok(new ResponseDto("Fetched user data", ContentConstants.statusCode200, userData));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseDto("Error retrieving user data", ContentConstants.statusCode500, null));
        }
    }



}