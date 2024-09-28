package com.talknow.message.mapper;

import com.talknow.message.dto.ContentDto;
import com.talknow.message.dto.ContentRequestDto;
import com.talknow.message.entity.Channel;
import com.talknow.message.entity.Content;

import java.time.LocalDateTime;

public class ContentMapper {
    public static ContentDto mapToContentDto(Content content, ContentDto contentDto) {
        if (content == null|| contentDto == null ) {
            return null;
        }
        contentDto.setMessage(content.getMessage());
        contentDto.setCreatedBy(content.getCreatedBy());
        contentDto.setCreatedTime(content.getCreatedTime());
        return contentDto;
    }

    public static Content mapToContent(ContentRequestDto contentRequestDto, Content content, String userId, String username) {
        if (content == null|| contentRequestDto == null ) {
            return null;
        }
        content.setContentId(contentRequestDto.getChannelId());
        content.setMessage(contentRequestDto.getMessage());
        content.setCreatedBy(username);
        content.setUserId(userId);
        content.setCreatedTime(LocalDateTime.now());
        return content;
    }
}
