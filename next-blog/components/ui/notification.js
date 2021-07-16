import { NotificationContext } from '../../hooks/context-notification';
import { useContext } from 'react';

import IconClose from './icons/icon-close';

import styled from 'styled-components';
const NotiDiv = styled.div`
    position: relative;
    background-color: ${props =>
        props.status === 'success' ? 'var(--color-status-success)' :
        props.status === 'info' ? 'var(--color-status-info)' :
        props.status === 'warning' ? 'var(--color-status-warning)' :
        props.status === 'danger' ? 'var(--color-status-danger)' :
        props.status === 'error' ? 'var(--color-status-error)' :
        'transparent' // props.status === 'hidden' | 'destroying'
    };
    color: white;
    width: 100%;
    margin-bottom: ${props => props.status === 'hidden' ? '0px' : '5px'};
    padding: ${props => props.status === 'hidden' ? '0px' : '10px 30px'};
    border-radius: 5px;

    opacity: ${props => props.status === 'destroying' ? '0' : '1'};
    transition: all 2s ease-in-out;

    & * {
        background-color: transparent;
    }
    & button {
        position: absolute !important; top: 10px; right: 10px;
        cursor: pointer;
        outline: 0;
    }
    & svg:hover {
        opacity: 0.73;
    }
`;
const Title = styled.p`
    font-size: 110%;
    font-weight: bold;
    text-align: center;
`;
const Body = styled.p`
    font-size: 90%;
    text-align: center;
`;

export default function Notification() {
    const { notification, hideNotification } = useContext(NotificationContext);
    const { status, title, body } = notification;

    if (!status || status === 'hidden')
        return <div id="notifier"></div>;

    return <NotiDiv id="notifier" status={status}>
        <button onClick={hideNotification} title="Close">
            <IconClose />
        </button>
        <Title>{title}</Title>
        <Body>{body}</Body>
    </NotiDiv>
}