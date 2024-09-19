package com.talknow.message.mapper;

import com.talknow.message.dto.MembersDto;
import com.talknow.message.entity.Members;

public class MembersMapper {
    public static MembersDto mapToMembersDto(Members members, MembersDto membersDto) {
        if (members == null || membersDto == null) {
            return null;
        }// Use channel entity if required
        membersDto.setUserId(members.getUserId());
        return membersDto;
    }

    public static Members mapToMembers(MembersDto membersDto, Members members) {
        if (members == null || membersDto == null) {
            return null;
        }
        members.setUserId(membersDto.getUserId());
        return members;
    }
}
