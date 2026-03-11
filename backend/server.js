const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3000 });

console.log('중계 서버가 3000번 포트에서 실행 중입니다.');

wss.on('connection', (ws) => {
    console.log('프론트엔드(OBS 오버레이 화면)가 연결되었습니다!');

    // 실제 아프리카TV 연동 전, 테스트를 위해 5초마다 가상의 후원 데이터를 보냅니다.
    const interval = setInterval(() => {
        const mockDonation = {
            type: 'donation',
            nickname: '테스트시청자' + Math.floor(Math.random() * 100),
            amount: Math.floor(Math.random() * 100) + 10
        };
        
        ws.send(JSON.stringify(mockDonation));
        console.log('가상 후원 데이터 전송 완료:', mockDonation);
    }, 5000);

    ws.on('close', () => {
        console.log('프론트엔드 연결이 종료되었습니다.');
        clearInterval(interval); // 연결 끊기면 데이터 전송 중지
    });
});
