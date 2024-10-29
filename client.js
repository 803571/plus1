import net from 'net';
import { readHeader, writeHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const HOST = 'localhost';
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
    console.log('서버에 연결되었습니다.');

    // 정상적으로 서버 실행하면 서버에 전송할 메시지 (아래 테스트를 위해 주석처리)
    // const message = 'HELLO';
    // const test = Buffer.from(message);

    // const header = writeHeader(test.length, 10);
    // const packet = Buffer.concat([header, test]);
    // // client.write(buffer);
    // client.write(packet);

    // 1024바이트가 넘는 메시지를 보내기 위한 테스트 (아래 테스트를 위해 주석처리)
    // const longMessage = 'V' .repeat(1024);
    // const LongMessageBuffer = Buffer.from(longMessage);

    // const longHeaderBuffer = writeHeader(LongMessageBuffer.length, 10);
    // const longPacket = Buffer.concat([longHeaderBuffer, LongMessageBuffer]);
    // client.write(longPacket);

    // 존재하지 않은 핸들러로 보내게 되면? 테스트
    // const message = 'HELLO';
    // const test = Buffer.from(message);

    // const header = writeHeader(test.length, 999);
    // const packet = Buffer.concat([header, test]);
    // client.write(packet);

    // Handler11 테스트
    const message = 'HELLO';
    const test = Buffer.from(message);

    const header = writeHeader(test.length, 11);
    const packet = Buffer.concat([header, test]);
    client.write(packet);
});

client.on('data ', (data) => {
    // Buffer 객체의 메서드를 사용하기 위해서 변환해줍니다.
    const buffer = Buffer.from(data); 
    const { handlerId, length } = readHeader(buffer);
    console.log(`handlerId: ${handlerId}`);
    console.log(`length: ${length}`);

    const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;

    // 메시지를 추출합니다.
    const message = buffer.slice(headerSize);
    // const message = buffer.subarray(headerSize); // slice가 옛날 메서드라서 해당 메서드 사용하면 됨. 기능이 같다.
    
    console.log(`서버로부터 받은 메시지: ${message}`);
});

client.on('close', () => {
    console.log('서버와 연결이 끊겼습니다.');
});

client.on('error', (err) => {
    console.error('클라이언트 에러: ', err);
});

