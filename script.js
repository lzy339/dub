document.addEventListener('DOMContentLoaded', () => {
    const dog = document.getElementById('dog');
    const obstacleContainer = document.getElementById('obstacle-container');
    const house = document.getElementById('house');
    const gameOverScreen = document.getElementById('game-over-screen');
    const restartBtn = document.getElementById('restart-btn');
    const finalScreen = document.getElementById('final-screen');
    
    let dogBottom = 20; // 강아지 초기 높이
    const jumpHeight = 150; // 점프 최대 높이
    const obstacleSpeed = 5; // 장애물 이동 속도
    const totalObstacles = 5; // 장애물 개수
    const obstacleGap = 350;
    let obstacles = []; // 장애물 정보를 저장할 배열
    let houseLeft; // 집 위치
    let isJumping = false; // 점프 상태 확인
  
 
  // 터치 이벤트로 점프 구현
  document.addEventListener('touchstart', () => {
    if (!isJumping) {
      jump();
    }
  });
    // 터치 이벤트로 리플레이 버튼 클릭
    restartBtn.addEventListener('touchstart', () => {
      gameOverScreen.classList.add('hidden'); // 게임 오버 화면 숨기기
      finalScreen.classList.add('hidden'); // Final 화면 숨기기
      resetGame(); // 게임 초기화
    });

  
    function jump() {
      isJumping = true;
      let currentJumpHeight = 0;
  
      const upInterval = setInterval(() => {
        if (currentJumpHeight >= jumpHeight) {
          clearInterval(upInterval);
  
          const downInterval = setInterval(() => {
            if (currentJumpHeight <= 0) {
              clearInterval(downInterval);
              isJumping = false;
            }
            currentJumpHeight -= 5;
            dogBottom = 20 + currentJumpHeight;
            dog.style.bottom = `${dogBottom}px`;
          }, 20);
        }
        currentJumpHeight += 5;
        dogBottom = 20 + currentJumpHeight;
        dog.style.bottom = `${dogBottom}px`;
      }, 20);
    }
  
    // 장애물 생성 함수
    function createObstacles() {
      let lastObstacleLeft = 800; // 첫 번째 장애물의 초기 위치
      for (let i = 0; i < totalObstacles; i++) {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
  
        // 개별 너비 설정 (랜덤 너비)
        const obstacleWidth = Math.floor(Math.random() * (120 - 50 + 1)) + 50; // 50px~120px 범위
        obstacle.style.width = `${obstacleWidth}px`;
  
        // 장애물 위치 설정
        obstacle.style.left = `${lastObstacleLeft}px`;
        obstacleContainer.appendChild(obstacle);
        obstacles.push(obstacle);
  
        // 간격 추가
        lastObstacleLeft += obstacleGap;
      }
  
      // 집 위치를 마지막 장애물의 뒤로 설정
      houseLeft = lastObstacleLeft + obstacleGap;
      house.style.left = `${houseLeft}px`;
    }
  
    // 장애물 및 집 이동 함수
    function moveElements() {
      obstacles.forEach((obstacle) => {
        let obstacleLeft = parseInt(obstacle.style.left);
        obstacleLeft -= obstacleSpeed;
        obstacle.style.left = `${obstacleLeft}px`;
  
        // 충돌 감지
        if (
          obstacleLeft < 80 && // 충돌 범위 수정
          obstacleLeft > 50 &&
          dogBottom < 90 // 장애물 높이보다 점프 높이가 낮을 때 충돌
        ) {
          endGame('Game Over');
        }
      });
  
      // 집 이동
      houseLeft -= obstacleSpeed;
      house.style.left = `${houseLeft}px`;
  
      // 강아지가 집에 도달했을 때
      if (houseLeft < 120 && houseLeft > 50) {
        showFinalScreen(); // 집에 도달하면 Final 화면 표시
        clearInterval(gameLoop); // 게임 루프 중지
      }
    }
  
    // 게임 종료 함수
    function endGame(message) {
      gameOverScreen.classList.remove('hidden'); // 게임 오버 화면 표시
    }
  
    // Final 화면 표시 함수
    function showFinalScreen() {
      finalScreen.classList.remove('hidden'); // Final 화면 표시
      gameOverScreen.classList.add('hidden'); // 게임 오버 화면 숨기기
    }
  
    // 리플레이 버튼 클릭 시 게임 리셋
    restartBtn.addEventListener('click', () => {
      gameOverScreen.classList.add('hidden'); // 게임 오버 화면 숨기기
      finalScreen.classList.add('hidden'); // Final 화면 숨기기
      resetGame(); // 게임 초기화
    });
  
    // 게임 초기화 함수
    function resetGame() {
      dog.style.bottom = '20px'; // 강아지 초기 위치
      obstacles = []; // 장애물 초기화
      houseLeft = 2000; // 집 초기 위치
      createObstacles(); // 장애물 생성
      gameLoop = setInterval(moveElements, 20); // 게임 루프 재시작
    }
  
    // 초기화 함수
    function initializeGame() {
      createObstacles(); // 장애물 생성
    }
  
    // 게임 루프
    let gameLoop = setInterval(moveElements, 20);
  
    // 게임 초기화 실행
    initializeGame();
  });
  