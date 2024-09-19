package com.talknow.message.service;

import com.talknow.message.dto.ContentDto;

import java.util.List;

public interface IContentService {
    ContentDto createContent(ContentDto contentDto);

    ContentDto getContentById(String id);

    List<ContentDto> getAllContents();

    ContentDto updateContent(String id, ContentDto contentDto);

    void deleteContent(String id);
}
