package com.talknow.message.mapper;

import com.talknow.message.dto.MembersDto;
import com.talknow.message.entity.Channel;
import com.talknow.message.entity.Members;

public class MembersMapper {
    public static MembersDto mapToMembersDto(Members members, MembersDto membersDto) {
        if (members == null || membersDto == null) {
            return null;
        }// Use channel entity if required
        membersDto.setMemberId(members.getMemberId());
        membersDto.setChannelId(members.getChannel().getChannelId());
        membersDto.setUserId(members.getUserId());
        return membersDto;
    }

    public static Members mapToMembers(Members members, Channel channel, String userId) {
        if (members == null) {
            return null;
        }
        members.setChannel(channel);
        members.setUserId(userId);
        return members;
    }
}
