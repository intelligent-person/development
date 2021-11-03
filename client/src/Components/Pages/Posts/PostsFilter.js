import React, {useState} from 'react';
import {Button, Checkbox, Col, Input, Radio, Row} from "antd";
import Search from "antd/es/input/Search";
import {NavLink} from "react-router-dom";
import {MenuUnfoldOutlined} from "@ant-design/icons";

const PostsFilter = ({postsCount, user, setInclude, setSort, setPage}) => {
    const [radio, setRadio] = React.useState('newest');
    const onSearch = value => console.log(value);
    const [isFilter, setIsFilter] = useState(false)
    const [isUnanswered, setIsUnanswered] = useState(false)
    const [isTags, setIsTags] = useState(false)
    const [tags, setTags] = useState('')
    console.log(tags.split(' ').join(','))
    const onChange = e => {
        setRadio(e.target.value);
    };
    const onNewest = () => {
        setSort('newest')
        setInclude({})
        setPage(1)
    }
    const onViews = () => {
        setSort('moreViews')
        setInclude({})
        setPage(1)
    }
    const onUnanswered = () => {
        setInclude({unanswered: 'true'})
        setPage(1)
    }

    const onFilter = () => {
        if (isFilter) setIsFilter(false)
        else setIsFilter(true)
    }
    const onSubmit = () => {
        setSort(radio)
        setIsFilter(false)
        isTags
            ? setInclude({unanswered: isUnanswered, tags: tags.split(' ').join(',')})
            : setInclude({unanswered: isUnanswered})
        setPage(1)
    }

    return (
        <div>
            <Row style={{marginBottom: 10}} justify={'space-between'}>
                <Col>
                    <h1>Все вопросы</h1>
                </Col>
                <Col flex={'auto'} style={{padding: '10px 20px 0'}}>
                    <Search placeholder="Искать..." onSearch={onSearch} enterButton/>
                </Col>
                <Col style={{marginTop: 10}}>
                    {user
                        ? <NavLink to={'/questions/ask'}>
                            <Button type={'primary'}>Ask Question</Button>
                        </NavLink>
                        : <NavLink to={'/login'}>
                            <Button type={'primary'}>Ask Question</Button>
                        </NavLink>
                    }
                </Col>
            </Row>
            <Row style={{marginBottom: 20}} justify={'space-between'}>
                <Col>
                    <h2>{postsCount} вопросов</h2>
                </Col>
                <Col>
                    <Button type={'default'} style={{borderRadius: 0}} autoFocus
                            onClick={onNewest}>Новейшие</Button>
                    <Button type={'default'} style={{borderRadius: 0}}
                            onClick={onViews}>Просмотры</Button>
                    <Button type={'default'} style={{borderRadius: 0}}
                            onClick={onUnanswered}>Без ответов</Button>
                    <Button type={'primary'} style={{borderRadius: 0}}
                            onClick={onFilter}><MenuUnfoldOutlined/> Фильтр</Button>
                </Col>
            </Row>

            {
                isFilter &&
                <div className={'filter'}>
                    <div>
                        <h3>Сортировка по</h3>
                        <Radio.Group onChange={onChange} value={radio}>
                            <Radio value={'newest'} style={{width: '100%', marginBottom: 10}}><h4>Новые</h4></Radio>
                            <Radio value={'moreViews'} style={{width: '100%', marginBottom: 10}}><h4>Больше просмотров</h4>
                            </Radio>
                            <Radio value={'lessViews'} style={{width: '100%', marginBottom: 10}}><h4>Меньше просмотров</h4>
                            </Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        <h3>Включить </h3>
                        <Checkbox onChange={e => setIsUnanswered(e.target.checked)} style={{width: '100%', marginBottom: 10}}>Без ответов</Checkbox><br/>
                        <Checkbox onChange={e => setIsTags(e.target.checked)} style={{width: '100%', marginBottom: 10}}>Теги: </Checkbox><br/>
                        {isTags && <Input onChange={e => setTags(e.target.value)} placeholder={'например, c++ javascript...'}/>}
                        <div style={{marginTop: 10, textAlign: 'right'}}>
                            <Button type={'primary'} onClick={onSubmit}>Submit</Button>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
};

export default React.memo(PostsFilter)