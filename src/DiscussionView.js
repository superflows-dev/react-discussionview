import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import { CommentView } from 'react-commentview'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Constants } from './Constants';
import { ArrowRightShort, CaretRight, ChatLeftDots, ChevronRight, Filter, Funnel, Paperclip, People, PlusLg, Search, Trash, X } from 'react-bootstrap-icons';
// import { CardImage, EmojiSmile, Paperclip, PlayBtn, XCircle, FilePdf, Trash, FileImage, FilePlay, Keyboard, ArrowUpRightSquare, Image, Dot, ArrowRight } from 'react-bootstrap-icons';
// import { ButtonNeutral, ButtonNext } from 'react-ui-components-superflows';
// import { UploadToS3 } from 'react-upload-to-s3';
// import { Constants } from './Constants';
// import { Util } from './Util';
import Themes from 'react-ui-themes-superflows'
import Services from './Services';
import { InputName, InputSearch } from 'react-ui-components-superflows';
// import Picker from 'emoji-picker-react';

import { ButtonCancel, ButtonNeutral } from 'react-ui-components-superflows';


export const DiscussionView = (props) => {

    const [data, setdata] = useState('[]');
    const [showFilters, setShowFilters] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState(Constants.FILTER_LAST_MONTH);
    const [showReply, setShowReply] = useState(false);
    const [replyTitle, setReplyTitle] = useState('');   
    const [replyCallbackInfo, setReplyCallbackInfo] = useState(null);
    const [replyRepliedToInfo, setReplyRepliedToInfo] = useState('{}');
    //const [ioInput, setIoInput] = useState(null);
    //const [isInputVisible, setIsInputVisible] = useState(true);
    const [dataFound, setDataFound] = useState(false);

    const refInput = useRef(null);
    const refItems = useRef(new Array());
    const refMessageEnd = useRef(null);

    const theme = Themes.getTheme("Default");
    

    function setShowSearchWrap(value) {

        setTimeout(() => {setShowSearch(value)}, 500);
    }

    function setSearchStringWrap(value) {

        if(value.length > 2 || value.length === 0) {
            setTimeout(() => {setSearchString(value)}, 500);
        }
    }
    
    function setShowFiltersWrap(value) {
        setTimeout(() => {setShowFilters(value)}, 500);
    }

    function setFilterWrap(value) {
        setTimeout(() => {setFilter(value)}, 500);
    }

    function setReplyRepliedToInfoWrap(value) {
        setReplyRepliedToInfo(JSON.stringify(value));
    }

    function getReplyRepliedToInfoWrap() {
        return JSON.parse(replyRepliedToInfo);
    }

    function setReplyCallbackInfoWrap(value) {
        setReplyCallbackInfo(JSON.stringify(value));
    }

    function getReplyCallbackInfoWrap() {
        return JSON.parse(replyCallbackInfo);
    }
    
    function setDataWrap(value) {
        setdata(JSON.stringify(value));
    }

    function getDataWrap() {
        return JSON.parse(data);
    }

    function getDiscussionInfo(discussionId) {
        let ret = null;
        const jsonData = getDataWrap();
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == discussionId) {
                ret = jsonData[i];;
            }

        }
        return ret;
    }

    function getDiscussionNumbers() {
        return getDataWrap().length;
    }

    function getDiscussionUserNumbers() {

        var ret = [];

        const jsonData = getDataWrap();

        for(var i = 0; i < jsonData.length; i++) {

            if(!ret.includes(jsonData[i].userId)) {
                ret.push(jsonData[i].userId);
            }

        }

        return ret.length;

    }

    function getDiscussionAttachmentNumbers() {

        var ret = 0;

        const jsonData = getDataWrap();

        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].attachment != null) {
                ret ++;
            }

        }

        return ret;

    }

    function getNextDiscussionId() {
        let ret = 0;

        const jsonData = getDataWrap();
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId > ret) {
                ret = jsonData[i].discussionId;
            }

        }
        return (ret + 1);
    }

    function getDiscussionIndexFromId(discussionId) {

        const jsonData = getDataWrap();
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == discussionId) {
                return i;
            }

        }
        return -1;

    }

    function onDelete(result) {

        
        const jsonData = getDataWrap();

        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                jsonData[i].text = "";
                jsonData[i].attachment = null;
                jsonData[i].deleted = true;

                Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);

                setDataWrap(jsonData);
                return;

            }

        }

    }

    function onSubmit(result) {

        const jsonData = getDataWrap();

        

        if(result.callbackInfo.new) {

            let newData = {};
            newData.topicId = props.topicId + '';
            newData.discussionId = getNextDiscussionId();
            newData.userId = props.userId;
            newData.userName = props.userName;
            newData.userPicture = props.userPicture;
            newData.timestamp = parseInt(new Date().getTime());
            newData.text = result.text;
            newData.attachment = result.attachment;
            newData.replyTo = result.callbackInfo.replyTo != null ? result.callbackInfo.replyTo : null;

            Services.createDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, newData);

            jsonData.push(newData);
            
            onReplyClose();
            
            setTimeout(() => { 
                setDataFound(true);
                setTimeout(() => {
                    setDataWrap(jsonData);
                    setReplyRepliedToInfoWrap({});
                }, 100);
            }, 1000)
    
        } else {
            
            for(var i = 0; i < jsonData.length; i++) {

                if(jsonData[i].discussionId == result.callbackInfo.discussionId) {

                    jsonData[i].text = result.text;
                    jsonData[i].attachment = result.attachment;
                    jsonData[i].edited = true;

                    Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);

                    onReplyClose();
                    
                    setTimeout(() => { 
                        setDataFound(true);
                        setTimeout(() => {
                            setDataWrap(jsonData);
                            setReplyRepliedToInfoWrap({});
                        }, 100);
                    }, 1000)

                }

            }

        }


    }

    async function onLiked(result){

        const jsonData = getDataWrap();

        for(var i = 0; i < jsonData.length; i++) {

            

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].likes != null) {
                    tempArr = jsonData[i].likes;
                }
                tempArr.push(result.userId);
                jsonData[i].likes = tempArr;

                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                
                setDataWrap(jsonData);
                return;

            }

        }

    }
    
    async function onLikeRemoved(result){

        const jsonData = getDataWrap();

        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].likes != null) {
                    for(var k = 0; k < jsonData[i].likes.length; k++) {
                        if(result.userId != jsonData[i].likes[k]) {
                            tempArr.push(jsonData[i].likes[k])
                        }
                    }
                }
                jsonData[i].likes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }

    }
    
    async function onDisLiked(result){
        const jsonData = getDataWrap();

        
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].disLikes != null) {
                    tempArr = jsonData[i].disLikes;
                }
                tempArr.push(result.userId);
                jsonData[i].disLikes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }
    }

    async function onDisLikeRemoved(result){

        const jsonData = getDataWrap();

        
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].disLikes != null) {
                    for(var k = 0; k < jsonData[i].disLikes.length; k++) {
                        if(result.userId != jsonData[i].disLikes[k]) {
                            tempArr.push(jsonData[i].disLikes[k])
                        }
                    }
                }
                jsonData[i].disLikes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }

    }
    
    function onReplied(topicId, discussionId){

        const discussion = getDiscussionInfo(discussionId)

        setReplyTitle(Constants.REPLY_TITLE_NEW_DISCUSSION);
        setReplyRepliedToInfoWrap({userName: discussion?.userName, text: discussion?.text});
        setReplyCallbackInfoWrap({topicId: topicId, discussionId: discussionId, new: true, replyTo: {userName: discussion?.userName, text: discussion?.text, discussionId: discussion?.discussionId}});
        setTimeout(() => {setShowReply(true);}, 500)

    }

    // function onNewDiscussion(topicId){
    //     setReplyTitle(Constants.REPLY_TITLE_NEW_DISCUSSION);
    //     setReplyRepliedToInfoWrap({});
    //     setReplyCallbackInfoWrap({topicId: topicId, new: true});
    //     setTimeout(() => {setShowReply(true);}, 500)
    // }

    function onReplyClose() {
       setTimeout(() => {setShowReply(false);}, 500)
    }
    
    async function onUpVoted(result){

        const jsonData = getDataWrap();

        
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].upVotes != null) {
                    tempArr = jsonData[i].upVotes;
                }
                tempArr.push(result.userId);
                jsonData[i].upVotes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }

    }
    
    async function onUpVoteRemoved(result){

        const jsonData = getDataWrap();

        
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].upVotes != null) {
                    for(var k = 0; k < jsonData[i].upVotes.length; k++) {
                        if(result.userId != jsonData[i].upVotes[k]) {
                            tempArr.push(jsonData[i].upVotes[k])
                        }
                    }
                }
                jsonData[i].upVotes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }


    }
    
    async function onDownVoted(result){

        const jsonData = getDataWrap();

        
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].downVotes != null) {
                    tempArr = jsonData[i].downVotes;
                }
                tempArr.push(result.userId);
                jsonData[i].downVotes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }

    }
    
    async function onDownVoteRemoved(result){

        const jsonData = getDataWrap();

        
        for(var i = 0; i < jsonData.length; i++) {

            if(jsonData[i].discussionId == result.discussionId) {

                let tempArr = [];
                if(jsonData[i].downVotes != null) {
                    for(var k = 0; k < jsonData[i].downVotes.length; k++) {
                        if(result.userId != jsonData[i].downVotes[k]) {
                            tempArr.push(jsonData[i].downVotes[k])
                        }
                    }
                }
                jsonData[i].downVotes = tempArr;
                await Services.updateDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, jsonData[i]);
                setDataWrap(jsonData);
                return;

            }

        }

    }

    function onReplyToClicked(result) {

        
        const discussionIndex = getDiscussionIndexFromId(result.replyTo.discussionId);
        
        setTimeout(() => {
            refItems.current[discussionIndex]?.scrollIntoView({ behavior: 'smooth' })
        }, 500);

    }

    function onReplyToClosed() {
        
        setReplyRepliedToInfoWrap({});
    }

    useEffect(() => {
        
        setTimeout(() => {
            if(refMessageEnd.current != null && refMessageEnd.current.scrollIntoView != null) {
                refMessageEnd.current?.scrollIntoView({ behavior: 'smooth' })
            }
        }, 500);

        async function fetchData() {

            let timestamp = 0;
            let result = null;

            

            if(showSearch) {

                result = await Services.getDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, props.topicId, 0);

                const searchedData = [];

                for(var i = 0; i < result.length; i++) {
                    if(result[i].userId != null) {
                        
                    }
                    if(result[i].userId != null && result[i].text.indexOf(searchString) >= 0) {
                        searchedData.push(result[i]);
                    }
                }

                

                setDataFound(true);
                setReplyCallbackInfoWrap({topicId: props.topicId, new: true});
                setDataWrap(searchedData)
                

            } else {

                if(filter == Constants.FILTER_TODAY) {
                    timestamp = (new Date().getTime()) - 24*60*60*1000;
                }
                if(filter == Constants.FILTER_YESTERDAY) {
                    timestamp = (new Date().getTime()) - 2*24*60*60*1000;
                }
                if(filter == Constants.FILTER_LAST_WEEK) {
                    timestamp = (new Date().getTime()) - 7*24*60*60*1000;
                }
                if(filter == Constants.FILTER_LAST_MONTH) {
                    timestamp = (new Date().getTime()) - 30*24*60*60*1000;
                }
                if(filter == Constants.FILTER_BEGINNING) {
                    timestamp = 0;
                }

                result = await Services.getDiscussion(props.table, props.awsRegion, props.awsSecret, props.awsKey, props.topicId, timestamp);

                setDataFound(true);
                setReplyCallbackInfoWrap({topicId: props.topicId, new: true});

                var data = [];
                for(var i = 0; i < result.length; i++) {

                    if(result[i].userId != null) {
                        data.push(result[i]);
                    }
                }
                setDataWrap(data)
                        
                    // }
                // }
            }

            
            
        }
        fetchData();

    }, [data, filter, searchString, showSearch, showFilters])
    
    return (

        <div>
            {<div className="p-2" style={{position: 'relative', backgroundColor: props.theme != null ? props.theme.discussionViewBackgroundColor : theme.discussionViewBackgroundColor}}>
                {
                    getDataWrap().map((obj1, key1) => {
                        
                        const refItem = (element) => refItems.current[key1] = element;
                        
                        return (
                            <div
                                className='mt-2'
                                key={(key1)} 
                                ref={refItem}
                                >
                                <div>
                                    <CommentView
                                        bucket={props.bucket}
                                        awsRegion={props.awsRegion}
                                        awsKey={props.awsKey}
                                        awsSecret={props.awsSecret}
                                        awsMediaConvertEndPoint={props.awsMediaConvertEndPoint}
                                        mode={obj1.deleted ? "deleted":"view"} 
                                        showCancel={obj1.userId == props.userId ? true : false}
                                        showEdit={obj1.userId == props.userId ? true : false}
                                        showDelete={obj1.userId == props.userId ? true : false}
                                        showLikes={props.enableLikes}
                                        edited={obj1.edited}
                                        likes={(obj1.likes != null && obj1.likes.length > 0) ? obj1.likes.length : 0}
                                        iHaveLiked={(obj1.likes != null && obj1.likes.length > 0 && obj1.likes.includes(props.userId)) ? true : false}
                                        showDisLikes={props.enableDisLikes}
                                        disLikes={(obj1.disLikes != null && obj1.disLikes.length > 0) ? obj1.disLikes.length : 0}
                                        iHaveDisLiked={(obj1.disLikes != null && obj1.disLikes.length > 0 && obj1.disLikes.includes(props.userId)) ? true : false}
                                        showReplyToClose={false}
                                        showVotes={props.enableVotes}
                                        upVotes={(obj1.upVotes != null && obj1.upVotes.length > 0) ? obj1.upVotes.length : 0}
                                        iHaveUpVoted={(obj1.upVotes != null && obj1.upVotes.length > 0 && obj1.upVotes.includes(props.userId)) ? true : false}
                                        downVotes={(obj1.downVotes != null && obj1.downVotes.length > 0) ? obj1.downVotes.length : 0}
                                        iHaveDownVoted={(obj1.downVotes != null && obj1.downVotes.length > 0 && obj1.downVotes.includes(props.userId)) ? true : false}
                                        mediaConvertRole={props.mediaConvertRole}
                                        callbackInfo={{topicId: props.topicId, discussionId: obj1.discussionId, userId: props.userId, new: false}}
                                        replyTo={obj1.replyTo != null ? obj1.replyTo : null}
                                        user={{id: obj1.userId, name: obj1.userName, picture: obj1.userPicture, timestamp: obj1.timestamp != null ? parseInt(obj1.timestamp/1000) : null}}
                                        preFill={{id: obj1.id, text: obj1.text != null ? obj1.text : "", attachment: obj1.attachment != null ? obj1.attachment : null}}
                                        cdnPrefix={props.cdnPrefix}
                                        onSubmit={(result) => {onSubmit(result)}}
                                        onDelete={(result) => {onDelete(result)}}onLiked={(result) => {onLiked(result)}}
                                        onLikeRemoved={(result) => {onLikeRemoved(result)}}
                                        onDisLiked={(result) => {onDisLiked(result)}}
                                        onDisLikeRemoved={(result) => {onDisLikeRemoved(result)}}
                                        onReplied={(result) => {onReplied(result.topicId, result.discussionId)}}
                                        onUpVoted={(result) => {onUpVoted(result)}}
                                        onUpVoteRemoved={(result) => {onUpVoteRemoved(result)}}
                                        onDownVoted={(result) => {onDownVoted(result)}}
                                        onDownVoteRemoved={(result) => {onDownVoteRemoved(result)}}
                                        onReplyTo={(result) => {onReplyToClicked(result)}}
                                        preventEditToView={false}
                                        theme={props.theme != null ? props.theme : theme}
                                                />
                                </div>

                            </div>

                        )

                    }
                    )
                }
                
                <div className="d-flex flex-wrap justify-content-end" style={{
                    bottom: '0px',
                    position: 'sticky',
                }}>
                    {<div className='mt-2 d-flex justify-content-between rounded p-2 flex-grow-1' style={{
                        backgroundColor: props.theme != null ? props.theme.commentViewMyBackgroundColor : theme.commentViewMyBackgroundColor,
                        border: 'solid 1px ' + theme.commentViewBorderColor,
                        filter: 'brightness (20%)'
                    }}>
                        <div className='d-flex mx-3 align-items-center' style={{
                            color: props.theme != null ? props.theme.commentViewDecorationColor : theme.commentViewDecorationColor
                        }}><ChatLeftDots /> &nbsp;&nbsp;<b>{getDiscussionNumbers()}</b></div>
                        <div className='d-flex mx-3 align-items-center' style={{
                            color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor
                        }}><People /> &nbsp;&nbsp;<b>{getDiscussionUserNumbers()}</b><ArrowRightShort /></div>
                        <div className='d-flex mx-3 align-items-center' style={{
                            color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor
                        }}><Paperclip /> &nbsp;&nbsp;<b>{getDiscussionAttachmentNumbers()}</b><ArrowRightShort /></div>
                    </div>}
                    {(props.enableSearch != null && props.enableSearch && !showFilters) && <div className='mt-2 d-flex justify-content-between rounded p-2 ms-2' style={{
                        backgroundColor: props.theme != null ? props.theme.commentViewMyBackgroundColor : theme.commentViewMyBackgroundColor,
                        border: 'solid 1px ' + theme.commentViewBorderColor
                    }}>
                        {!showSearch && <div className='btn_search d-flex mx-1 align-items-center' style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}} onClick={() => {setShowSearchWrap(true)}}><Search /></div>}
                        {showSearch && <div className='btn_trash d-flex mx-1 align-items-center' style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}} onClick={() => {setShowSearchWrap(false)}}><Trash /></div>}
                    </div>}
                    {(props.enableFilters != null && props.enableFilters && !showSearch) && <div className='mt-2 d-flex justify-content-between rounded p-2 ms-2' style={{
                        backgroundColor: props.theme != null ? props.theme.commentViewMyBackgroundColor : theme.commentViewMyBackgroundColor,
                        border: 'solid 1px ' + theme.commentViewBorderColor
                    }}>
                        {!showFilters && <div className='btn_funnel d-flex mx-1 align-items-center'  style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}  onClick={() => {setShowFiltersWrap(true)}}><Funnel /></div>}
                        {showFilters && <div className='btn_trash d-flex mx-1 align-items-center'  style={{cursor: 'pointer', color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor}}  onClick={() => {setShowFiltersWrap(false)}}><Trash /></div>}
                    </div>}
                    {showSearch && <div className='input_search d-flex flex-wrap justify-content-start mt-2 rounded p-2 w-100' style={{
                        backgroundColor: props.theme != null ? props.theme.commentViewMyBackgroundColor : theme.commentViewMyBackgroundColor,
                        border: 'solid 1px ' + theme.commentViewBorderColor
                    }}>
                        <InputSearch setValue={setSearchStringWrap} />
                    </div>}
                    {showFilters && <div className='d-flex flex-wrap justify-content-start mt-2 rounded p-2 w-100' style={{
                        backgroundColor: props.theme != null ? props.theme.commentViewMyBackgroundColor : theme.commentViewMyBackgroundColor,
                        border: 'solid 1px ' + theme.commentViewBorderColor
                    }}>

                        <div className='my-1 w-100' style={{
                            color: props.theme != null ? props.theme.commentViewDecorationHighlightColor : theme.commentViewDecorationHighlightColor
                        }}><b>Filter messages since</b></div>
                        <div className='my-1 w-100 d-flex justify-content-start flex-wrap'>
                            {filter != Constants.FILTER_TODAY && <div className='btn_today me-1 mb-1' onClick={()=>{setFilterWrap(Constants.FILTER_TODAY)}}><ButtonNeutral caption="Today" icon="Circle"/></div>}
                            {filter == Constants.FILTER_TODAY && <div className='me-1 mb-1'><ButtonNeutral caption="Today" icon="CheckCircle" custom={{backgroundColor: '#444444', color: theme.commentViewBackgroundColor}}/></div>}
                            {filter != Constants.FILTER_YESTERDAY && <div className='btn_yesterday me-1 mb-1' onClick={()=>{setFilterWrap(Constants.FILTER_YESTERDAY)}}><ButtonNeutral caption="Yesterday" icon="Circle"/></div>}
                            {filter == Constants.FILTER_YESTERDAY && <div className='me-1 mb-1'><ButtonNeutral caption="Yesterday" icon="CheckCircle" custom={{backgroundColor: '#444444', color: theme.commentViewBackgroundColor}}/></div>}
                            {filter != Constants.FILTER_LAST_WEEK && <div className='btn_last_week me-1 mb-1' onClick={()=>{setFilterWrap(Constants.FILTER_LAST_WEEK)}}><ButtonNeutral caption="Last week" icon="Circle"/></div>}
                            {filter == Constants.FILTER_LAST_WEEK && <div className='me-1 mb-1'><ButtonNeutral caption="Last week" icon="CheckCircle" custom={{backgroundColor: '#444444', color: theme.commentViewBackgroundColor}}/></div>}
                            {filter != Constants.FILTER_LAST_MONTH && <div className='btn_last_month me-1 mb-1' onClick={()=>{setFilterWrap(Constants.FILTER_LAST_MONTH)}}><ButtonNeutral caption="Last month" icon="Circle"/></div>}
                            {filter == Constants.FILTER_LAST_MONTH && <div className='me-1 mb-1'><ButtonNeutral caption="Last month" icon="CheckCircle" custom={{backgroundColor: '#444444', color: theme.commentViewBackgroundColor}}/></div>}
                            {filter != Constants.FILTER_BEGINNING && <div className='btn_beginning me-1 mb-1' onClick={()=>{setFilterWrap(Constants.FILTER_BEGINNING)}}><ButtonNeutral caption="Beginning" icon="Circle"/></div>}
                            {filter == Constants.FILTER_BEGINNING && <div className='me-1 mb-1'><ButtonNeutral caption="Beginning" icon="CheckCircle" custom={{backgroundColor: '#444444', color: theme.commentViewBackgroundColor}}/></div>}
                        </div>

                    </div>}
                    {(!showFilters && !showSearch) && <div className='mt-2 w-100'>
                        <CommentView
                            bucket={props.bucket}
                            awsRegion={props.awsRegion}
                            awsKey={props.awsKey}
                            awsSecret={props.awsSecret}
                            awsMediaConvertEndPoint={props.awsMediaConvertEndPoint}
                            mode="edit"
                            clearOnSubmit={true}
                            preventEditToView={true}
                            showEdit={true}
                            showReplyToClose={true}
                            replyTo={getReplyRepliedToInfoWrap()}
                            mediaConvertRole={props.mediaConvertRole}
                            callbackInfo={getReplyCallbackInfoWrap()}
                            user={{id: props.userId, name: props.userName, picture: props.userPicture}}
                            cdnPrefix={props.cdnPrefix}
                            onSubmit={(result) => {onSubmit(result)}}
                            theme={props.theme != null ? props.theme : theme}
                            onReplyToClosed={() => {onReplyToClosed()}}
                        />
                    </div>}
                </div>
                
                <div ref={refMessageEnd} />

                {/* <Modal show={showReply} onHide={onReplyClose} className="modal-lg p-0">
                    <Modal.Header closeButton style={{borderBottom: '0px'}}>
                    <Modal.Title>{replyTitle}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='p-0'>
                        <CommentView
                            bucket="superflows-myuploads"
                            awsRegion={props.awsRegion}
                            awsKey={props.awsKey}
                            awsSecret={props.awsSecret}
                            awsMediaConvertEndPoint={props.awsMediaConvertEndPoint}
                            mode="edit"
                            mediaConvertRole={props.mediaConvertRole}
                            callbackInfo={getReplyCallbackInfoWrap()}
                            replyTo={getReplyRepliedToInfoWrap()}
                            user={{id: props.userId, name: props.userName, picture: props.userPicture}}
                            cdnPrefix={props.cdnPrefix}
                            onSubmit={(result) => {onSubmit(result)}}
                            theme={theme1}
                                    />
                    </Modal.Body>
                </Modal> */}
                
            </div>}
        </div>

    )
}


export default DiscussionView;