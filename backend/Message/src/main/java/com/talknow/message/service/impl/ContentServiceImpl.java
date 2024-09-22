package com.talknow.message.service.impl;

import com.talknow.message.dto.ContentDto;
import com.talknow.message.entity.Content;
import com.talknow.message.mapper.ContentMapper;
import com.talknow.message.repository.ContentRepository;
import com.talknow.message.service.IContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContentServiceImpl implements IContentService {
    private final ContentRepository contentRepository;

    @Autowired
    public ContentServiceImpl(ContentRepository contentRepository) {

        this.contentRepository = contentRepository;
    }

    @Override
    public ContentDto createContent(ContentDto contentDto) {
        Content content = ContentMapper.mapToContent(contentDto, new Content());
        Content savedContent = contentRepository.save(content);
        return ContentMapper.mapToContentDto(savedContent, new ContentDto());
    }

    @Override
    public ContentDto getContentById(String id) {
        Optional<Content> contentOpt = contentRepository.findById(id);
        if (contentOpt.isPresent()) {
            return ContentMapper.mapToContentDto(contentOpt.get(), new ContentDto());
        } else {
            throw new RuntimeException("Content not found for ID: " + id);
        }
    }

    @Override
    public List<ContentDto> getAllContents() {
        List<Content> contents = contentRepository.findAll();
        return contents.stream()
                .map(content -> ContentMapper.mapToContentDto(content, new ContentDto()))
                .collect(Collectors.toList());
    }

    @Override
    public ContentDto updateContent(String id, ContentDto contentDto) {
        Optional<Content> contentOpt = contentRepository.findById(id);
        if (contentOpt.isPresent()) {
            Content existingContent = contentOpt.get();
            ContentMapper.mapToContent(contentDto, existingContent);
            Content updatedContent = contentRepository.save(existingContent);
            return ContentMapper.mapToContentDto(updatedContent, new ContentDto());
        } else {
            throw new RuntimeException("Content not found for ID: " + id);
        }
    }

    @Override
    public void deleteContent(String id) {
        if (contentRepository.existsById(id)) {
            contentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Content not found for ID: " + id);
        }
    }
}
