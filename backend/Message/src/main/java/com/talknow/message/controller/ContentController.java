package com.talknow.message.controller;

import com.talknow.message.constants.ContentConstants;
import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ResponseDto;
import com.talknow.message.service.IChannelService;
import com.talknow.message.service.IContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/message", produces = {MediaType.APPLICATION_JSON_VALUE})
public class ContentController {


    private final IContentService contentService;

    @Autowired
    public ContentController(IContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping(value = "/send")
    public ResponseEntity<ResponseDto>createContent(@RequestBody ContentDto contentDto) {
        ContentDto createdContent = contentService.createContent(contentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseDto(ContentConstants.statusCode200,ContentConstants.statusCode201, createdContent));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContentDto> getContentById(@PathVariable String id) {
        ContentDto contentDto = contentService.getContentById(id);
        return new ResponseEntity<>(contentDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<ContentDto>> getAllContents() {
        List<ContentDto> contents = contentService.getAllContents();
        return new ResponseEntity<>(contents, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContentDto> updateContent(@PathVariable String id, @RequestBody ContentDto contentDto) {
        ContentDto updatedContent = contentService.updateContent(id, contentDto);
        return new ResponseEntity<>(updatedContent, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContent(@PathVariable String id) {
        contentService.deleteContent(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}