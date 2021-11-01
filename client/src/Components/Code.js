import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {darcula} from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = ({value, language}) => {
    return (
        <SyntaxHighlighter language={'cpp'} style={darcula}>
            {value ?? ''}
        </SyntaxHighlighter>
    );
};

export default Code;