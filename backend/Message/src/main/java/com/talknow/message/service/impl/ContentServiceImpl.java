package com.talknow.message.service.impl;

import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ContentRequestDto;
import com.talknow.message.dto.UserDto;
import com.talknow.message.entity.Content;
import com.talknow.message.mapper.ContentMapper;
import com.talknow.message.repository.ContentRepository;
import com.talknow.message.service.IAuthUserService;
import com.talknow.message.service.IContentService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class ContentServiceImpl implements IContentService {
    private final ContentRepository contentRepository;
    private final IAuthUserService authUserService;


    @Override
    public ContentDto createMessage(ContentRequestDto contentRequestDTo, String api_key) {
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String userId = userResult.get("id");
        String username = userResult.get("username");
        Content content = ContentMapper.mapToContent(contentRequestDTo, new Content(), userId, username);
        Content savedContent = contentRepository.save(content);
        return ContentMapper.mapToContentDto(savedContent, new ContentDto());
    }

//    @Override
//    public ContentDto getContentById(String id) {
//        Optional<Content> contentOpt = contentRepository.findById(id);
//        if (contentOpt.isPresent()) {
//            return ContentMapper.mapToContentDto(contentOpt.get(), new ContentDto());
//        } else {
//            throw new RuntimeException("Content not found for ID: " + id);
//        }
//    }
//
//    @Override
//    public List<ContentDto> getAllContents() {
//        List<Content> contents = contentRepository.findAll();
//        return contents.stream()
//                .map(content -> ContentMapper.mapToContentDto(content, new ContentDto()))
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public ContentDto updateContent(String id, ContentDto contentDto) {
//        Optional<Content> contentOpt = contentRepository.findById(id);
//        if (contentOpt.isPresent()) {
//            Content existingContent = contentOpt.get();
//            ContentMapper.mapToContent(contentDto, existingContent);
//            Content updatedContent = contentRepository.save(existingContent);
//            return ContentMapper.mapToContentDto(updatedContent, new ContentDto());
//        } else {
//            throw new RuntimeException("Content not found for ID: " + id);
//        }
//    }
//
//    @Override
//    public void deleteContent(String id) {
//        if (contentRepository.existsById(id)) {
//            contentRepository.deleteById(id);
//        } else {
//            throw new RuntimeException("Content not found for ID: " + id);
//        }
//    }

    @Override
    public List<ContentDto> getMessageByChannelId(String channelId) {
        List<Content> message = contentRepository.findByChannel_ChannelId(channelId);
        return message.stream().map(content -> {
            ContentDto contentDto = new ContentDto();
            return ContentMapper.mapToContentDto(content, contentDto);
        }).collect(Collectors.toList());
    }
}
