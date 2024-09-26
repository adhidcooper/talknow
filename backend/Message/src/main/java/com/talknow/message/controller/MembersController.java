package com.talknow.message.controller;

import com.talknow.message.dto.MembersDto;
import com.talknow.message.service.IMembersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


//@RestController
//@RequestMapping(value = "api/members", produces = {MediaType.APPLICATION_JSON_VALUE})
//public class MemberController {

//    private final IMembersService membersService;
//
//    @Autowired
//    public MemberController(IMembersService membersService) {
//        this.membersService = membersService;
//    }
//
//    @PostMapping
//    public ResponseEntity<MembersDto> createMember(@RequestBody MembersDto membersDto) {
//        MembersDto createdMember = membersService.createMember(membersDto);
//        return new ResponseEntity<>(createdMember, HttpStatus.CREATED);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<MembersDto> getMemberById(@PathVariable String id) {
//        MembersDto membersDto = membersService.getMemberById(id);
//        return new ResponseEntity<>(membersDto, HttpStatus.OK);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<MembersDto>> getAllMembers() {
//        List<MembersDto> members = membersService.getAllMembers();
//        return new ResponseEntity<>(members, HttpStatus.OK);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<MembersDto> updateMember(@PathVariable String id, @RequestBody MembersDto membersDto) {
//        MembersDto updatedMember = membersService.updateMember(id, membersDto);
//        return new ResponseEntity<>(updatedMember, HttpStatus.OK);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteMember(@PathVariable String id) {
//        membersService.deleteMember(id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }
//}