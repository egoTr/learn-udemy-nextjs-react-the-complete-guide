import { useState, useEffect } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import IconCopy from '../ui/icons/icon-copy';

// styles
import styled from 'styled-components';
const CodeDiv = styled.div`
    position: relative;

    & button {
        background-color: transparent;
        position: absolute !important; top: 10px; right: 5px;
        cursor: pointer;
        outline: 0;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    & span[role="indicator"] {
        color: var(--color-app-secondary);
        visibility: ${props => props.copied ? 'visible' : 'hidden'};
        font-weight: bold;
    }
`;

export default function CodeBlockWithCopyButton({ text, children }) {
    const [copied, setCopied] = useState(false);

    function copyHandler() {
        setCopied(true);

        setTimeout( () => setCopied(false), 500 );
    }

    return <CodeDiv copied={copied}>
        <CopyToClipboard onCopy={copyHandler} text={text}>
            <button title="Copy to clipboard">
                <IconCopy className={copied ? 'stroke-secondary' : 'stroke-white'} />
                <span role="indicator">COPIED</span>
            </button>
        </CopyToClipboard>
        {children}
    </CodeDiv>
}