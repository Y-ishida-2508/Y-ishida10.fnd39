'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// ボタンがクリックされたときに実行される関数
function handleClick() {
   const num = document.querySelector('.inputText2').value;

   let cards = [];
   //console.log(num);
   if (num <= 4 || num === "4 or 8 or 16 or 24") {
      //console.log("4までエリア通過");
      cards = [
         "1","2",
         "1","2",
      ];
   } else if (num <= 6) {
      cards = [
         "1","3","2",
         "1","3","2",
      ];    
   } else if (num <= 8) {
      cards = [
         "1","2","3","4",
         "1","2","3","4",
      ];
   } else if (num <= 10) {
      cards = [
         "1","3","4","5","6",
         "1","3","4","5","6",
      ];
   } else if (num <= 12) {
      cards = [
         "1","3","4","5","6","7",
         "1","3","4","5","6","7",
      ];
   } else if (num <= 14) {
      cards = [
         "1","3","4","5","6","7","8",
         "1","3","4","5","6","7","8",
      ];
   } else if (num <= 16) {
      cards = [
         "1","5","6","7","8","2","3","4",
         "1","5","6","7","8","2","3","4",
      ];
   } else if (num <= 18) {
      cards = [
         "1","5","6","7","8","9","2","3","4",
         "1","5","6","7","8","9","2","3","4",
      ];
   } else if (num <= 20) {
      cards = [
         "1","2","3","4","5","6","7","8","9","10",
         "1","2","3","4","5","6","7","8","9","10",
      ];
   } else if (num <= 22) {
      cards = [
         "1","2","3","4","5","6","7","8","9","10","11",
         "1","2","3","4","5","6","7","8","9","10","11",
      ];
   } else if (num <= 24) {
      cards = [
         "1","2","3","4","5","6","7","8","9","10","11","12",
         "1","2","3","4","5","6","7","8","9","10","11","12",
      ];
   } else {
      cards = [
         "1","2",
         "1","2",
      ];
   }
   //console.log("1_orgCards：" + cards);

   //シャッフルする
   // Fisher-Yatesアルゴリズム: 配列を効率的にシャッフルする方法

   // for (let i=cards.length-1; i>0; i--){
   //    const j = Math.floor(Math.random() * (i + 1));
   //    [cards[i], cards[j]] = [cards[j], cards[i]];
   // }

   for (let i=cards.length-1; i>0; i--){
      let r = rand(0,i);
      //[cards[i], cards[j]] = [cards[j], cards[i]];
      let tmp = cards[i];
      cards[i] = cards[r];
      cards[r] = tmp;
   }
   //console.log("2_fixCards：" + cards);

   // 中身を空にする
   let field = "";
   document.getElementById("field").innerHTML = "";
   field = document.getElementById("field");

   for (let i=0; i<cards.length; i++){
      let elm = document.createElement("div");
      elm.className = "card";
      elm.innerHTML = ""; //cards[i];
      elm.index = i;
      elm.onclick = click;
      field.appendChild(elm);
   }

   let first = null; //明示的に「空」にする
   let second = null;
   let timer = null;

   let count = 0;
   let hanten = 0;
   let clock = document.getElementById("clock");
   let timer2 = setInterval( function() {
      clock.innerText = "　経過時間〔秒〕：" +(++count)}, 600 );
    

   //min～maxまでで整数乱数を作る
   function rand(min, max){
      return Math.floor(Math.random()*(max-min+1))+min;
   }

   //クリックされた時
   function click(em){
      if (timer){
         clearTimeout(timer);
         judge();
      }
      let elm = em.target;
      elm.innerHTML = cards[ elm.index ];

      if (cards[elm.index] === "1"){
         elm.style.backgroundImage = "url('./image/image1.png')";
      } else if(cards[elm.index] === "2") {
         elm.style.backgroundImage = "url('./image/image2.png')";
      } else if(cards[elm.index] === "3") {
         elm.style.backgroundImage = "url('./image/image3.png')";
      } else if(cards[elm.index] === "4") {
         elm.style.backgroundImage = "url('./image/image4.png')";
      } else if(cards[elm.index] === "5") {
         elm.style.backgroundImage = "url('./image/image5.png')";
      } else if(cards[elm.index] === "6") {
         elm.style.backgroundImage = "url('./image/image6.png')";
      } else if(cards[elm.index] === "7") {
         elm.style.backgroundImage = "url('./image/image7.png')";
      } else if(cards[elm.index] === "8") {
         elm.style.backgroundImage = "url('./image/image8.png')";
      } else if(cards[elm.index] === "9") {
         elm.style.backgroundImage = "url('./image/image9.png')";
      } else if(cards[elm.index] === "10") {
         elm.style.backgroundImage = "url('./image/image10.png')";
      } else if(cards[elm.index] === "11") {
         elm.style.backgroundImage = "url('./image/image11.png')";
      } else {
         elm.style.backgroundImage = "url('./image/image12.png')";
      }

      if (!first){
         first = elm;
      } else if (first.index === elm.index){
         return;
      } else {
         second = elm;
         timer = setTimeout( judge, 700);
      }
   }

   //ジャッジする
   function judge (){
      if (first.innerHTML === second.innerHTML ){
         first.style.visibility = "hidden";
         second.style.visibility = "hidden";
         hanten += 2;
         if ( hanten === cards.length ){
            clearInterval(timer2);

            const textElement2 = document.getElementById('textGameEnd');
            // 状況に応じて内容を変更する関数
            textElement2.textContent = "全部そろいました！！";
            // 5秒後に消える
            setTimeout(() => {
               textElement2.textContent = "　";
            }, 5000);

            const textElement3 = document.getElementById('clock');
            // 7秒後に消える
            setTimeout(() => {
               textElement3.textContent = "　";
            }, 7000);
         }
      } else {
         first.innerHTML = "";
         second.innerHTML = "";
         first.style.backgroundImage = "url('./image/image0.png')";
         second.style.backgroundImage = "url('./image/image0.png')";
      }
      first = null; //明示的に「空」にする
      second = null;
      timer = null;
   }
}

// ページをリロードする
function reload(){
   location.reload();
}

// グローバル変数
const cards3 = ["りんご","みかん","バナナ"];
const cards4 = ["キウイ","スイカ","メロン"];
const cardsTmp = ["りんご","みかん","バナナ"];
let iflag = 0;
const iflag2 = [0,0,0];
const iflag2tmp = [0,0,0];

//配置記憶Ver.
function handleClick2() {
   iflag = iflag + 1;
   //console.log("iFlag：" + iflag);
   if (iflag === 2){
      cards3.splice(0, cards3.length, ...cards4);
      iflag2.splice(0, iflag2.length, ...iflag2tmp);
      iflag = 0;
   }else {
      cards3.splice(0, cards3.length, ...cardsTmp);
      iflag2.splice(0, iflag2.length, ...iflag2tmp);
   }

   // 中身を空にする
   let field3 = "";
   document.getElementById("field3").innerHTML = "";

   field3 = document.getElementById("field3");
   //console.log(field3.tagName);
   //console.log(field3);
   for (let i=0; i<cards3.length; i++){
      let elm3 = document.createElement("div");
      elm3.className = "card3";
      //elm3.innerHTML = ""; //cards3[i];
      elm3.innerHTML = cards3[i];
      if (cards3[i] === "りんご") {
         elm3.style.backgroundImage = "url('./image/card3/りんご.png')";
      } else if (cards3[i] === "みかん") {
         elm3.style.backgroundImage = "url('./image/card3/みかん.png')";
      } else if (cards3[i] === "バナナ") {
         elm3.style.backgroundImage = "url('./image/card3/ばなな.png')";
      } else if (cards3[i] === "キウイ") {
         elm3.style.backgroundImage = "url('./image/card3/きうい.png')";
      } else if (cards3[i] === "スイカ") {
         elm3.style.backgroundImage = "url('./image/card3/すいか.png')";
      } else {
         elm3.style.backgroundImage = "url('./image/card3/めろん.png')";
      }
      elm3.index = i;
      elm3.onclick = click3;
      field3.appendChild(elm3);
   }

   //クリックされた時
   function click3(em3){
      let elm3 = em3.target;
      //elm3.innerHTML = cards3[ elm3.index ];
      elm3.innerHTML = "";
      elm3.style.backgroundImage = "url('./image/card3/cardBack.png')";
      elm3.onclick = click4;
      //field3.appendChild(elm3);
   }

   //再度クリックされた時
   function click4(em4){
      let elm4 = em4.target;
      elm4.innerHTML = cards3[ elm4.index ];
      //console.log("cards3：" + cards3[elm4.index]);
      if (cards3[elm4.index] === "りんご") {
         elm4.style.backgroundImage = "url('./image/card3/りんご.png')";
      } else if (cards3[elm4.index] === "みかん") {
         elm4.style.backgroundImage = "url('./image/card3/みかん.png')";
      } else if (cards3[elm4.index] === "バナナ") {
         elm4.style.backgroundImage = "url('./image/card3/ばなな.png')";
      } else if (cards3[elm4.index] === "キウイ") {
         elm4.style.backgroundImage = "url('./image/card3/きうい.png')";
      } else if (cards3[elm4.index] === "スイカ") {
         elm4.style.backgroundImage = "url('./image/card3/すいか.png')";
      } else {
         elm4.style.backgroundImage = "url('./image/card3/めろん.png')";
      }
   }
}

//配置記憶Ver. 全て裏返す
function try4() {
   //console.log("iFlag2：" + iflag);
   // 中身を空にする
   let field3 = "";
   document.getElementById("field3").innerHTML = "";

   field3 = document.getElementById("field3");

   //console.log("cards3：" + cards3);

   for (let i=0; i<cards3.length; i++){
      //console.log(cards3[i]);
      let elm5 = document.createElement("div");
      elm5.className = "card3";
      //elm3.innerHTML = ""; //cards3[i];
      //elm5.innerHTML = cards3[i];
      elm5.style.backgroundImage = "url('./image/card3/cardBack.png')";
      //cards3[i].style.backgroundImage = "url('./image/card3/cardBack.png')";
      elm5.index = i;
      elm5.onclick = click5;
      field3.appendChild(elm5);
   }

   //クリックされた時
   function click5(em5){
      let elm5 = em5.target;
      //console.log("em5.target：" + em5.target); 
      //console.log("elm5.index：" + elm5.index); 
      //console.log("elm5.index：" + cards3[ elm5.index ]);     
      elm5.innerHTML = cards3[ elm5.index ];
      //elm5.innerHTML = "";
      //elm5.style.backgroundImage = "url('./image/card3/cardBack.png')";
      if (cards3[elm5.index] === "りんご") {
         elm5.style.backgroundImage = "url('./image/card3/りんご.png')";
      } else if (cards3[elm5.index] === "みかん") {
         elm5.style.backgroundImage = "url('./image/card3/みかん.png')";
      } else if (cards3[elm5.index] === "バナナ") {
         elm5.style.backgroundImage = "url('./image/card3/ばなな.png')";
      } else if (cards3[elm5.index] === "キウイ") {
         elm5.style.backgroundImage = "url('./image/card3/きうい.png')";
      } else if (cards3[elm5.index] === "スイカ") {
         elm5.style.backgroundImage = "url('./image/card3/すいか.png')";
      } else {
         elm5.style.backgroundImage = "url('./image/card3/めろん.png')";
      }
      //elm5.onclick = click4;
      //field3.appendChild(elm3);
   }
}

function try5() {
   const textElement = document.getElementById('text');
   textElement.textContent = "　　言葉が「ココ」にでるよ";
   // 音声認識のセットアップ
   const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
   recognition.lang = 'ja-JP';

   // ボタンをクリックして音声認識を開始
   recognition.start();

   // 音声認識の結果を処理
   recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase(); // 認識された単語を取得
      console.log(`認識された言葉: ${transcript}`);

      // const textElement = document.getElementById('text');
      // 状況に応じて内容を変更する関数
      textElement.textContent = transcript;
      //3秒後に消す
      setTimeout(() => {
         textElement.textContent = "　";
      }, 3000);
      
      // 対応するカードの画像を対象画像に変更
      // 中身を空にする
      let field3 = "";
      document.getElementById("field3").innerHTML = "";

      field3 = document.getElementById("field3");

      for (let i=0; i<cards3.length; i++){
         let elm6 = document.createElement("div");
         elm6.className = "card3";

         if (cards3[i] === "りんご" && cards3[i]=== transcript) {
            //console.log("newルート0通過");
            iflag2[i] = 1;
            elm6.style.backgroundImage = "url('./image/card3/りんご.png')";
            elm6.innerHTML = cards3[i]; //文字表示
         } else if (cards3[i] === "みかん" && cards3[i]=== transcript) {
            //console.log("newルート1通過");
            iflag2[i] = 1;
            elm6.style.backgroundImage = "url('./image/card3/みかん.png')";
            elm6.innerHTML = cards3[i]; //文字表示
         } else if (cards3[i] === "バナナ" && cards3[i]=== transcript) {
            //console.log("newルート2通過");
            iflag2[i] = 1;
            elm6.style.backgroundImage = "url('./image/card3/ばなな.png')";
            elm6.innerHTML = cards3[i]; //文字表示
         } else if (cards3[i] === "キウイ" && cards3[i]=== transcript) {
            //console.log("newルート3通過");
            iflag2[i] = 1;
            elm6.style.backgroundImage = "url('./image/card3/きうい.png')";
            elm6.innerHTML = cards3[i]; //文字表示
         } else if (cards3[i] === "スイカ" && cards3[i]=== transcript) {
            //console.log("newルート4通過");
            iflag2[i] = 1;
            elm6.style.backgroundImage = "url('./image/card3/すいか.png')";
            elm6.innerHTML = cards3[i]; //文字表示
         } else if (cards3[i] === "メロン" && cards3[i]=== transcript) {
            //console.log("newルート5通過");
            iflag2[i] = 1;
            elm6.style.backgroundImage = "url('./image/card3/めろん.png')";
            elm6.innerHTML = cards3[i]; //文字表示
         } else if(iflag2[i] === 0) {
            //console.log("newルート6通過");
            elm6.style.backgroundImage = "url('./image/card3/cardBack.png')";
         } else if(iflag2[i] === 1 && i === 0) {
            //console.log("newルート7通過");
            if (cards3[i] === "りんご") {
               elm6.style.backgroundImage = "url('./image/card3/りんご.png')";
            } else {
               elm6.style.backgroundImage = "url('./image/card3/きうい.png')";
            }
            elm6.innerHTML = cards3[i]; //文字表示
         } else if(iflag2[i] === 1 && i === 1) {
            //console.log("newルート8通過");
            if (cards3[i] === "みかん") {
               elm6.style.backgroundImage = "url('./image/card3/みかん.png')";
            } else {
               elm6.style.backgroundImage = "url('./image/card3/すいか.png')";
            }
            elm6.innerHTML = cards3[i]; //文字表示
         } else if(iflag2[i] === 1 && i === 2) {
            //console.log("newルート9通過");
            if (cards3[i] === "バナナ") {
               elm6.style.backgroundImage = "url('./image/card3/ばなな.png')";
            } else {
               elm6.style.backgroundImage = "url('./image/card3/めろん.png')";
            }
            elm6.innerHTML = cards3[i]; //文字表示
         // } else {
         //    console.log("newルート10通過");
         //    alert(`"${transcript}" に対応するカードが見つかりません`);
         }
         elm6.index = i;
         elm6.onclick = click6;
         field3.appendChild(elm6); //カード表示 
      }
   }

   //クリックされた時
   function click6(em6){
      let elm6 = em6.target;
      // console.log("em6.target：" + em6.target); 
      // console.log("elm6.index：" + elm6.index); 
      // console.log("elm6.index：" + cards3[ elm6.index ]);     
      elm6.innerHTML = cards3[ elm6.index ];

      if (cards3[elm6.index] === "りんご") {
         elm6.style.backgroundImage = "url('./image/card3/りんご.png')";
      } else if (cards3[elm6.index] === "みかん") {
         elm6.style.backgroundImage = "url('./image/card3/みかん.png')";
      } else if (cards3[elm6.index] === "バナナ") {
         elm6.style.backgroundImage = "url('./image/card3/ばなな.png')";
      } else if (cards3[elm6.index] === "キウイ") {
         elm6.style.backgroundImage = "url('./image/card3/きうい.png')";
      } else if (cards3[elm6.index] === "スイカ") {
         elm6.style.backgroundImage = "url('./image/card3/すいか.png')";
      } else {
         elm6.style.backgroundImage = "url('./image/card3/めろん.png')";
      }
      //elm6.onclick = click7;
      //field3.appendChild(elm6);
   }

   // エラーハンドリング
   recognition.onerror = (event) => {
      console.error('音声認識エラー:', event.error);
      alert('音声認識に失敗しました。もう一度試してください。');
   }
}
