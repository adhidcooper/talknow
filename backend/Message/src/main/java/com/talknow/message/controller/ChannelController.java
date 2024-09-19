package com.talknow.message.controller;

import com.talknow.message.dto.ChannelDto;
import com.talknow.message.service.IChannelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/channels", produces = {MediaType.APPLICATION_JSON_VALUE})
public class ChannelController {

    private final IChannelService channelService;


    @Autowired
    public ChannelController(IChannelService contentService) {
        this.channelService = contentService;
    }

    // Create a new channel
    @PostMapping
    public ResponseEntity<ChannelDto> createChannel(@RequestBody ChannelDto channelDto) {
        ChannelDto createdChannel = channelService.createChannel(channelDto);
        return new ResponseEntity<>(createdChannel, HttpStatus.CREATED);
    }

    // Get a channel by ID
    @GetMapping("/{id}")
    public ResponseEntity<ChannelDto> getChannelById(@PathVariable String id) {
        ChannelDto channelDto = channelService.getChannelById(id);
        return new ResponseEntity<>(channelDto, HttpStatus.OK);
    }

    // Get all channels
    @GetMapping
    public ResponseEntity<List<ChannelDto>> getAllChannels() {
        List<ChannelDto> channels = channelService.getAllChannels();
        return new ResponseEntity<>(channels, HttpStatus.OK);
    }

    // Update a channel by ID
    @PutMapping("/{id}")
    public ResponseEntity<ChannelDto> updateChannel(@PathVariable String id, @RequestBody ChannelDto channelDto) {
        ChannelDto updatedChannel = channelService.updateChannel(id, channelDto);
        return new ResponseEntity<>(updatedChannel, HttpStatus.OK);
    }

    // Delete a channel by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChannel(@PathVariable String id) {
        channelService.deleteChannel(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}