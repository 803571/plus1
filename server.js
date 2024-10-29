// net module (TCP서버를 만들어주는 친구)
import net from 'net';
import { readHeader, writeHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const PORT = 5555;

const server = net.createServer((socket) => {
    console.log(`클라이언트가 연결되었습니다.: ${socket.remoteAddress}:${socket.remotePort}`);

    // 어떤 이벤트를 주고 받을 때 사용함
    socket.on('data', (data) => {
        const buffer = Buffer.from(data);

        const { handlerId, length } = readHeader(data);
        console.log(`handlerId: ${handlerId}`);
        console.log(`length: ${length}`);

        const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID;
        //  메시지를 추출합니다.
        const message = buffer.slice(headerSize);

        console.log(`클라이언트로부터 받은 메시지: ${message}`);

        const responseMessage = 'Hi! There';
        const responseBuffer = Buffer.from(responseMessage);

        const header = writeHeader(responseBuffer.length, handlerId);
        const responsePacket = Buffer.concat([header, responseBuffer]);

        // socket.write(data); // 이벤트로 받은 data를 같은 소켓에 사용
        socket.write(responsePacket);
    })

    // 이 소켓으로 접속한 유저의 커넥션이 끊기면 발생하는 이벤트
    socket.on('end', () => {
        console.log('클라이언트의 연결이 끊겼습니다.');
    });

    // 에러가 발생할 경우 띄우는 이벤트
    socket.on('error', (err) => {
        console.log('소켓 에러: ', err);
    });
})

server.listen(PORT, () => {
    console.log(`다음 포트에서 에코 서버가 수신을 대기하고 있습니다.: ${PORT}`);
    // ▼ 서버가 정확히 어디서 뜨고 있는지 정보를 가져와 console로 찍어줍니다.
    console.log(server.address());
})