package com.talknow.message.mapper;

import com.talknow.message.dto.ContentDto;
import com.talknow.message.entity.Content;

public class ContentMapper {
    public static ContentDto mapToContentDto(Content content, ContentDto contentDto) {
        if (content == null|| contentDto == null ) {
            return null;
        }
        contentDto.setMessage(content.getMessage());
//        contentDto.setChannelId(content.getChannel().getChannelId());
        contentDto.setCreatedBy(content.getCreatedBy());
        contentDto.setCreatedTime(content.getCreatedTime());
        return contentDto;
    }

    public static Content mapToContent(ContentDto contentDto, Content content) {
        if (content == null|| contentDto == null ) {
            return null;
        }
        content.setMessage(contentDto.getMessage());
        content.setCreatedBy(contentDto.getCreatedBy());
        content.setUserId(contentDto.getUserId());
        content.setCreatedTime(contentDto.getCreatedTime());
        return content;
    }
}
