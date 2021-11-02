import React, {useEffect, useState} from 'react';
import MyEditor from "../../../Markdown/MyEditor";
import '../../../Markdown/markdown.css'
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {darcula} from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import {Button, Input, Modal, Select} from "antd";
import {NavLink} from "react-router-dom";
import ModalWindow from "./ModalWindow";

const PostCreator = ({addPost, user}) => {
    const [language, setLanguage] = useState('cpp')
    const [title, setTitle] = useState(``)
    const [body, setBody] = useState(``)
    const [tags, setTags] = useState(``)
    const [titleDirty, setTitleDirty] = useState(false)
    const [bodyDirty, setBodyDirty] = useState(false)
    const [tagsDirty, setTagsDirty] = useState(false)
    const [titleError, setTitleError] = useState('Заголовок не может быть пустым!')
    const [bodyError, setBodyError] = useState('Содержание не может быть пустым!')
    const [tagsError, setTagsError] = useState('Добавьте хотя бы один тег')
    const [isValid, setIsValid] = useState(false)
    const tagsArray = tags.split(' ')


    useEffect(() => {
        if(titleError || bodyError || tagsError) {
            setIsValid(false)
        } else {
            setIsValid(true)
        }
    }, [titleError, bodyError, tagsError])
    const createPost = () => {
        if(user){
            addPost(title, body, language, user, tagsArray, 0, 0)
            setTitle('')
            setTags('')
            setBody('')
        }
    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setTitleDirty(true)
                break
            case 'tags':
                setTagsDirty(true)
                break
        }
    }
    const titleHandler = (e) => {
        setTitle(e.target.value)
        if(e.target.value.length < 10) {
            setTitleError('Заголовок слишком короткий!')
            if(e.target.value.length === 0) {
                setTitleError('Заголовок не может быть пустым!')
            }
        } else if (e.target.value.length > 200) {
            setTitleError('Заголовок слишком длинный!')
        } else {
            setTitleError('')
        }
    }
    const bodyHandler = (body) => {
        setBody(body)
        if(body.length < 100) {
            setBodyError('Содержание слишком короткое!')
            if(body.length === 0) {
                setBodyError('Содержание не может быть пустым!')
            }
        } else {
            setBodyError('')
        }
    }
    const tagsHandler = (e) => {
        setTags(e.target.value)
        if(tagsArray.length > 5) {
            setTagsError('Вы ввели слишком много тегов!')
        } else {
            setTagsError('')
        }
    }
    return (
        <div>
            <div className={'contentBlock sendBlock'}>
                <Select defaultValue="cpp" style={{width: 120}} onChange={e => setLanguage(e)}>
                    <Select.Option value="javascript">JavaScript</Select.Option>
                    <Select.Option value="cpp">C/C++</Select.Option>
                    <Select.Option value="python">Python</Select.Option>
                    <Select.Option value="java">Java</Select.Option>
                    <Select.Option value="jsx">JSX(React.js)</Select.Option>
                    <Select.Option value="html">HTML</Select.Option>
                    <Select.Option value="css">CSS</Select.Option>
                    <Select.Option value="django">Django</Select.Option>
                    <Select.Option value="php">Php</Select.Option>
                </Select>
                { isValid
                    ? <NavLink to={'/questions'}><Button type={'primary'} onClick={createPost}>Задать вопрос</Button></NavLink>
                    : <Button type={'primary'} onClick={() => {
                        setTitleDirty(true)
                        setBodyDirty(true)
                        setTagsDirty(true)
                    }}>Задать вопрос</Button>
                }
            </div>
            <div className={'contentBlock'}>
                <h2 style={{marginBottom: 0}}>Заголовок</h2>
                <h5>Будьте конкретны и представьте, что задаете вопрос другому человеку.</h5>
                {(titleDirty && titleError) && <div style={{color: 'red'}}>{titleError}</div>}
                <Input onBlur={blurHandler} name={'title'} onChange={titleHandler} value={title}
                       placeholder={'например, как работает Excel...'}/>
            </div>
            <div className={'contentBlock'}>
                <h3 style={{marginBottom: 0}}>Содержимое:</h3>
                {bodyDirty  && <div style={{color: 'red'}}>{bodyError}</div>}
                <MyEditor bodyHandler={bodyHandler} setBodyDirty={setBodyDirty}/>
            </div>
            <div style={{padding: 14}}>
                <ReactMarkdown children={body} components={{
                    code({node, inline, className, children, ...props}) {
                        return !inline ? (
                            <SyntaxHighlighter
                                // wrapLines={true}
                                customStyle={{
                                    padding: 0,
                                    paddingLeft: 10,
                                    margin: 0
                                    /*overflow-y: hidden;*/
                                }}
                                children={String(children).replace(/\n$/, '')}
                                style={darcula}
                                language={language}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={'monospace'} {...props}>
                                {children}
                            </code>
                        )
                    }
                }} remarkPlugins={[remarkGfm]}/>
            </div>
            <div className={'contentBlock'}>
                <h2>Тags:</h2>
                <h5>Добавьте до 5 тегов через пробел, чтобы описать, о чем ваш вопрос.</h5>
                {(tagsDirty && tagsError) && <div style={{color: 'red'}}>{tagsError}</div>}
                <Input name={'tags'} onBlur={blurHandler} onChange={tagsHandler} value={tags}
                       placeholder={'например, javascript cpp...'}/>
            </div>
            <ModalWindow/>
        </div>
    );
};

export default React.memo(PostCreator)