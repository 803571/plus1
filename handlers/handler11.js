const handler11 = (data) => {
    // 수신한 데이터를 역순으로 변환합니다.
    const processdData = data.toString().split().reverse().join('');
    return Buffer.from(processdData);
};

export default handler11;