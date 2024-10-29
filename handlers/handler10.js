const handler10 = (data) => {
    // 수신한 데이터를 대문자로 변환합니다.
    const processdData = data.toString().toUpperCase();
    return Buffer.from(processdData);
};

export default handler10;