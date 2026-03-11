const SERVER_URL = 'ws://localhost:3000';
const container = document.getElementById('overlay-container');

function connectWebSocket() {
    const socket = new WebSocket(SERVER_URL);

    socket.onopen = () => {
        console.log('중계 서버와 성공적으로 연결되었습니다.');
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'donation') {
            showDonationAlert(data);
        }
    };

    socket.onclose = () => {
        console.log('서버와 연결이 끊어졌습니다. 3초 후 재연결 시도...');
        setTimeout(connectWebSocket, 3000);
    };
}

// 화면에 알림 박스를 그리고 4초 뒤 지우는 함수
function showDonationAlert(data) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert-box';
    alertDiv.innerText = `🎁 ${data.nickname}님이 별풍선 ${data.amount}개를 후원했습니다!`;
    
    container.appendChild(alertDiv);

    // 4초(4000ms) 뒤에 알림 삭제 (메모리 최적화)
    setTimeout(() => {
        alertDiv.remove();
    }, 4000);
}

// 스크립트가 로드되면 즉시 웹소켓 연결 시작
connectWebSocket();
