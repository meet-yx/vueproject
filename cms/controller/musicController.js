/**
 * Created by Administrator on 2017/11/16 0016.
 */
"use strict";
const musicModal = require("../modal/musicModal.js");

module.exports = {
    //音乐列表和歌单列表
    musicList(req, res){
        let music;
        let song;
        musicModal.musicList(null, null, null, null, 5, 1).then(function (data) {
            music = data;
        }).then(function () {
            musicModal.songList(null, null, null, null, 5, 1).then(function (data) {
                song = data;
                //console.log(music)
                //console.log(song)
                res.render("musicList", {"musicList": music, "songList": song})
            })
        }).catch(function (err) {
            console.log(err);
            res.send({code: 500})
        })
    },
    //音乐列表和歌单列表ajax
    musicListAjax(req, res){
        let id = req.body.id;
        let musicName = req.body.musicName;
        let createUser = req.body.createUser;
        let state = req.body.state;
        let pageSize = req.body.pageSize;
        let currentPage = req.body.currentPage;
        let music;
        let song;
        //console.log(pageSize)
        musicModal.musicList(id, musicName, createUser, state, pageSize, currentPage).then((data) => {
            music = data
        }).then(function () {
            musicModal.songList(id, musicName, createUser, state, pageSize, currentPage).then((data) => {
                song = data;
                res.json({"code": 200, "music": music, "song": song})
            }).catch((err)=> {
                res.json({"code": 500})
            })
        })
    },
    //分页,查询
    musicListNum(req, res){
        let musicName = req.body.musicName;
        let createUser = req.body.createUser;
        let state = req.body.state;
        let music;
        let song;
        musicModal.musicListNum(musicName, createUser, state).then((data)=> {
            music=data;
        }).then(function(){
            musicModal.songListNum(musicName,createUser,state).then((data)=>{
                song=data;
                res.json({"code": 200, "music": music,"song":song})
            })
        })
            .catch((err)=> {
            res.json({"code": 500})
        })
    },

    //删除音乐和歌单
    del(req, res){
        let id = req.body.id;
        let state = req.body.state;
        musicModal.songDel(state,id).then(function (data) {
            res.json({code: 200, data: data})
        }).catch(function (err) {
            console.log(err);
            res.send({code: 500})
        })
    }

};