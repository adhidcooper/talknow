package com.talknow.message.service.impl;

import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ContentRequestDto;
import com.talknow.message.dto.UserDto;
import com.talknow.message.entity.Channel;
import com.talknow.message.entity.Content;
import com.talknow.message.mapper.ContentMapper;
import com.talknow.message.repository.ChannelRepository;
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
    private final ChannelRepository channelRepository;

    @Override
    public ContentDto createMessage(ContentRequestDto contentRequestDto, String api_key) {
        // Get current user details
        UserDto currentUser = authUserService.getCurrentUser(api_key);
        Map<String, String> userResult = (Map<String, String>) currentUser.getResult();
        String userId = userResult.get("id");
        String username = userResult.get("username");

        // Fetch the Channel entity based on the channel ID in the request DTO
        Channel channel = channelRepository.findByChannelId(contentRequestDto.getChannelId())
                .orElseThrow(() -> new RuntimeException("Channel not found"));

        // Map the DTO to Content entity and set the channel
        Content content = ContentMapper.mapToContent(contentRequestDto, new Content(), userId, username);
        content.setChannel(channel);  // Set the channel

        // Save the content
        Content savedContent = contentRepository.save(content);

        // Return the mapped DTO
        return ContentMapper.mapToContentDto(savedContent, new ContentDto());
    }

    @Override
    public List<ContentDto> getMessageByChannelId(String channelId) {
        List<Content> message = contentRepository.findByChannel_ChannelId(channelId);
        return message.stream().map(content -> {
            ContentDto contentDto = new ContentDto();
            return ContentMapper.mapToContentDto(content, contentDto);
        }).collect(Collectors.toList());
    }
}
