import React from 'react';

const DateComponent = ({postDate}) => {
    const data = new Date().toLocaleDateString().split('.')
    const time = new Date().toLocaleTimeString()
    const postData = postDate.slice(0, postDate.indexOf('T'))
        .split('-')
        .filter(item => item !== '-').reverse()
    let date = null
    const newMonth = Number(data[1]) + 11
    const newDay = Number(data[0]) + 30
    if (data[2] !== postData[2] && data[1] - postData[1] > 0) {
        if (data[2] - postData[2] === 1) date = `год назад`
        else if (data[2] - postData[2] > 1) date = `${data[2] - postData[2]} года назад`
        else if (data[2] - postData[2] > 4) date = `${data[2] - postData[2]} лет назад`
    } else if (data[2] !== postData[2]) {
        if (newMonth - postData[1] === 1) date = `месяц назад`
        else if (newMonth - postData[1] > 1 && newMonth - postData[1] < 5) date = `${newMonth - postData[1]} месяца назад`
        else if (newMonth - postData[1] > 4) date = `${newMonth - postData[1]} месяцев назад`
        else if (newDay - postData[0] === 1) date = `Вчера`
        else if (newDay - postData[0] > 4) date = `${newDay - postData[0]} дня назад`
        else if (newDay - postData[0] > 4) date = `${newDay - postData[0]} дней назад`
    } else if (data[1] !== postData[1] && data[0] - postData[0] < 31) {
        if (newDay - postData[0] === 1) date = `Вчера`
        else if (newDay - postData[0] > 1 && newDay - postData[0] < 5) date = `${newDay - postData[0]} дня назад`
        else if (newDay - postData[0] > 4) date = `${newDay - postData[0]} дней назад`
    } else if (data[1] !== postData[1]) {
        if (data[1] - postData[1] === 1) date = `месяц назад`
        else if (data[1] - postData[1] > 1 && data[1] - postData[1] < 5) date = `${data[1] - postData[1]} месяца назад`
        else if (data[1] - postData[1] > 4) date = `${data[1] - postData[1]} месяцев назад`
    } else if (data[0] !== postData[0]) {
        if (data[0] - postData[0] === 1) date = `Вчера`
        else if (data[0] - postData[0] > 1 && data[0] - postData[0] < 5) date = `${data[0] - postData[0]} дня назад`
        else if (data[0] - postData[0] > 4) date = `${data[0] - postData[0]} дней назад`
    } else if (data[0] === postData[0]) {
        date = `Сегодня`
    }
    return (
        <div>
            {date}
        </div>
    );
};

export default React.memo(DateComponent)