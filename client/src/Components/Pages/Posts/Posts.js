import React from 'react';
import {Button, Popover} from "antd";
import {NavLink} from "react-router-dom";
import './posts.css'
import DateComponent from "../../DateComponent/DateComponent";

const Posts = ({posts}) => {
    console.log(posts)
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
                            <Popover content={'content'} title="Title" trigger="hover">
                                <Button size={'small'} className={'tag'}>{tag}</Button>
                            </Popover>)}</div>
                    </div>

                    <div className={'user'}>
                        <div className={'userWrapper'}>
                            <div>
                                <img src={`${post.user.picture}`}/>
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