package com.talknow.message.service;

import com.talknow.message.dto.MembersDto;

import java.util.List;

public interface IMembersService {
    MembersDto createMember(MembersDto membersDto);

    MembersDto getMemberById(String id);

    List<MembersDto> getAllMembers();

    MembersDto updateMember(String id, MembersDto memberDto);

    void deleteMember(String id);
}








