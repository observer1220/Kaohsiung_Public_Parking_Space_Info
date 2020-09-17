function init() {
    getData(); // 第1個動作：擷取停車場資訊
}

document.querySelector('.area').addEventListener('change', function (e) {
    renderList(e.target.value);
}, false)

// 擷取停車場遠端資料
let data;

function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://api.kcg.gov.tw/api/service/get/897e552a-2887-4f6f-a6ee-709f7fbe0ee3');
    xhr.send();
    xhr.onload = function () {
        data = JSON.parse(xhr.responseText);
        renderList(); // 第2個動作：顯示停車場資訊
    }
}

// 顯示資料用函式
function renderList(district) {
    let ary = data.data;
    let str = ''; // 主要內容，預設字串為空值
    let selectDist = ''; // 選擇區域，預設字串為空值
    let distParkNum = 0;
    let parkLot = 0; // 預設數字為0
    for (let i = 0; ary.length > i; i++) {
        if (ary[i]['行政區'] == district) {
            str +=
                '<li>' + ary[i]['臨時停車處所'] + '<br>' +
                '停車位：' + ary[i]['可提供小型車停車位'] + '格' + '<br>' +
                '地址：' + ary[i]['地址'] + '</li>';
            // 
            selectDist = '<p>' + ary[i]['行政區'] + '</p>';
            distParkNum += parseInt(ary[i]['可提供小型車停車位']);

        }
        // 統計JSON資料庫中總共有幾筆資料?
        document.querySelector('.totalParkSpace').innerHTML = ary.length;
        // 將字串解析為數字，並將其加總(若=前面沒有+，則只能撈到1筆數字)，park為停車格總數
        parkLot += parseInt(ary[i]['可提供小型車停車位']);

    }
    // 必須讓所有數字加總完，才能將其顯示，若放在同一層會變成字串
    document.querySelector('.totalParkLot').innerHTML = parkLot;
    // 必須讓for迴圈撈完所有資料，才能將其顯示，若放在同一層，不論你選擇哪一區，它都會顯示121筆資料
    document.querySelector('.list').innerHTML = str;
    // 在HTML擷取selectDist的class名稱，並插入變數selectDist的字串
    document.querySelector('.selectDist').innerHTML = selectDist;
    // 在HTML擷取distParkNum的class名稱，並插入變數distParkNum的字串
    document.querySelector('.distParkNum').innerHTML = distParkNum;
}

init();