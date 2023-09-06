let inputBox = document.querySelector('.enter'); // class='enter' 인 상위 객체를 가져옴
let ul = document.querySelector('ul');
let complete = document.querySelector('#complete');
let list = document.querySelector('.list');
let title = document.querySelector('h1');
let count = 0;
let NoCount = 0;
let counting = 0;
let today = new Date(); // 현재 날짜 값을 가져옵니다.
let year = today.getFullYear(); // today 객체로부터 현재 연도를 가져옵니다. getFullYear() 메서드를 사용하여 연도를 얻습니다.
let month = ('0' + (today.getMonth() + 1)).slice(-2); // 월과 일을 가져오는 부분에서 문자열로 변환하고, padStart 함수를 사용하여 두 자리 숫자로 포맷팅했습니다.
let day = ('0' + today.getDate()).slice(-2); // 이렇게 하면 한 자리 숫자의 경우 앞에 0을 추가하여 항상 두 자리 숫자로 표시됩니다.

let dateString = year + '-' + month + '-' + day;

title.textContent = dateString;

function toggleCheckbox(checkbox) {
  const listItem = checkbox.parentElement; // 체크박스의 부모 li 요소를 찾습니다.
  const removeButton = listItem.querySelector('.removeButton'); // 삭제 버튼 요소를 찾습니다.

  if (checkbox.checked) {
    // 만약 체크박스가 체크되면
    listItem.classList.add('completed'); // 할 일 항목을 완료 상태로 변경합니다.
    checkbox.disabled = true; // 체크 후에 체크박스를 비활성화합니다.
    NoCount--; // 할 일 항목 수를 감소시킵니다.
    list.textContent = '할일 ' + NoCount + '개'; // 할 일 항목 수를 업데이트합니다.
    removeButton.style.display = 'none'; // 삭제 버튼을 숨깁니다.
    count++; // 완료된 항목 수를 증가시킵니다.
  }

  complete.textContent = '완료 : ' + count + ' 개'; // 완료된 항목 수를 업데이트합니다.

  if (NoCount == 0) {
    list.textContent = ''; // 할 일 항목 초기화.
  }
}

// 입력 상자에서 Enter 키 이벤트 감지
inputBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    // keypress (enter) 이벤트 발생 시
    const todoText = inputBox.value.trim();
    counting++; // 카운트 수를 증가시킵니다.
    if (todoText !== '') {
      // 새로운 할 일 항목 생성
      const listItem = document.createElement('li');
      listItem.innerHTML = `
                <input type="checkbox" class="checkbox" onchange="toggleCheckbox(this)" >
                ${todoText}
                <button type="button" class="removeButton">삭제</button>
            `;

      // 생성된 li 요소에 클래스 추가
      listItem.classList.add('item'); // 'item' 클래스 추가

      NoCount++; // 할 일 항목 수를 증가시킵니다.
      ul.appendChild(listItem); // 새로운 목록 추가
      inputBox.value = ''; // inputBox value 값 초기화.
      list.textContent = '할일 ' + NoCount + '개'; // 할 일 항목 수를 업데이트합니다.
      if (NoCount <= 0) {
        // 할일 카운트가 0이랑 같거나 작을 시
        list.textContent = ''; // 공백 처리 후
        NoCount = 0; // 할일 카운트를 0으로 초기화
      }
      list.style.color = 'rgb(174, 38, 38)'; // 글자 색상을 rgb(174,38,38)로 변경
    } else {
      counting--;
      alert('할 일을 추가해주세요');
    } // input 박스에 공백 일 경우 경고창 출력
    return counting;
  }
});

// 할 일 목록에서 삭제 버튼 클릭 감지
ul.addEventListener('click', function (event) {
  if (event.target.classList.contains('removeButton')) {
    // 클릭한 삭제 버튼의 부모 항목(li) 삭제
    event.target.parentElement.remove();
    counting--; // 카운트 수를 감소시킵니다.
    NoCount--; // 할 일 항목 수를 감소시킵니다.
    complete.textContent = '완료 : ' + count + ' 개'; // 완료 수를 업데이트합니다.
    list.textContent = '할일 ' + NoCount + '개'; // 할일 수를 업데이트합니다.
    inputBox.removeAttribute('disabled'); // inputBox disabled 속성 삭제
    if (NoCount <= 0) {
      list.textContent = '';
      NoCount = 0;
    }
    return counting;
  }
});

inputBox.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    if (counting >= 11) {
      // counting 값 11개 이상 일 경우
      alert('더 이상 할 일을 추가할 수 없습니다.'); // 경고창 출력
      inputBox.setAttribute('disabled', 'true'); // 입력창 비활성화
    }
  }
});
