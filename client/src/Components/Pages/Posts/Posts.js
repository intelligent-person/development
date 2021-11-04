import React from 'react';
import {Button, Popover} from "antd";
import {NavLink} from "react-router-dom";
import './posts.css'
import DateComponent from "../../DateComponent/DateComponent";
import {getTagCount} from "../../../Redux/posts-reducer";
import {useDispatch, useSelector} from "react-redux";
import Tag from "../../Tag/Tag";

const Posts = ({posts}) => {
    const dispatch = useDispatch()
    const tagCount = useSelector(state => state.posts.tagsCount)
    const showTag = async (tag) => {
        dispatch(getTagCount(tag))
    }
    return (
        <div>
            {posts.map(post =>
                <div key={post._id} className={'post'}>
                    <div className={'postInfo'}>
                        <div className={'count'}>{post.views}</div>
                        <div>Просмотры</div>
                        <div className={'count'}>{post.answersCount}</div>
                        <div>Ответы</div>
                    </div>
                    <div className={'postBody'}>
                        <NavLink to={`/questions/id/${post._id}`}>
                            <div style={{width: '100%'}}><h2 style={{color: 'inherit'}}>{post.title}</h2></div>
                        </NavLink>
                        <div style={{marginBottom: 20}}>
                            {post.body
                                .split('')
                                .filter(item => item !== '`' && item !== '#' && item !== '*')
                                .slice(0, 270).join('') + '...'}</div>
                        <div>{post.tags.map(tag =>
                            <Popover /*content={'content'}*/ title={<Tag tag={tag} tagCount={tagCount}/>}
                                     trigger="hover" mouseEnterDelay={0.5}>
                                <Button size={'small'} className={'tag'}
                                        onMouseEnter={(e) => showTag(tag, e)}>{tag}</Button>
                            </Popover>)}</div>
                    </div>

                    <div className={'user'}>
                        <div className={'userWrapper'}>
                            <div>
                                <img src={`${post.user.picture}`} alt={'Avatar'}/>
                            </div>
                            <div style={{marginLeft: 10}}>
                                <h4><NavLink
                                    to={`users/${post.user._id}`}>{post.user.name}</NavLink>
                                </h4>
                                <div style={{display: 'inline-flex'}}>
                                    <div style={{marginRight: 5}}>{post.user.status}</div>
                                    <div>{post.user.reputation}</div>
                                </div>
                            </div>
                        </div>
                        <div><DateComponent postDate={post.date}/></div>
                    </div>
                </div>
            )}
        </div>
    );
};


export default React.memo(Posts)