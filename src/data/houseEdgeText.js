export let text1 =
  'The House Edge (HE) is simply the average gross profit the casino/lottery can reliably expect to siphon from the player each game/bet. For instance, the American export Roulette Wheel has a HE of ~5%. Per one-million dollars in revenue for that gambling instrument, the casino can reliably profit $50,000';

export let text2 =
  "That doesn't sound too bad right? Wrong! The key here is time - and this is exactly what most gamblers fail to realize. If the house drains 5 cents from each dollar you bet on average, the longer you play, the more you will be drained! If you did not win enough money to profit early on, you now have a deep hole in your pocket to make up right?";

export let text3 =
  'Thus, the gambler mentality is born! In this mindset, the player with a big loss continues to play, hoping they can recuperate their losses or profit. However, this mindset is dangerous as you are bound to lose more money the longer you play, but somehow the player keeps convincing themselves a big win is around the corner ... yeah, for the casinos!';

export const writeInTextBox = (
  viewedText,
  setViewedText,
  clearTextBox,
  setActive,
  fxnText1,
  fxnText2,
  fxnText3
) => {
  const textBox = document.getElementById('house-edge-text');

  let index = 0;

  let interval = setInterval(() => {
    if (!viewedText) {
      if (index < fxnText1.length) {
        setViewedText(true);
        setActive(1);

        textBox.innerHTML += fxnText1.charAt(index);

        fxnText1 = fxnText1.substring(1, fxnText1.length);
        console.log(fxnText1);
      } else {
        clearInterval(interval);

        setTimeout(() => {
          clearTextBox();
          writeInTextBox2(
            viewedText,
            fxnText2,
            fxnText3,
            clearTextBox,
            setActive
          );
        }, 4000);
      }
    } else {
      setActive(1);
      return (textBox.innerHTML = text1);
    }
  }, 10);
};

export const writeInTextBox2 = (
  viewedText,
  fxnText2,
  fxnText3,
  clearTextBox,
  setActive
) => {
  const textBox = document.getElementById('house-edge-text');

  let index = 0;

  let interval = setInterval(() => {
    if (!viewedText) {
      if (index < fxnText2.length) {
        setActive(2);
        textBox.innerHTML += fxnText2.charAt(index);
        fxnText2 = fxnText2.substring(1, fxnText2.length);
        console.log(fxnText2);
      } else {
        clearInterval(interval);

        setTimeout(() => {
          clearTextBox();
          writeInTextBox3(viewedText, fxnText3, clearTextBox, setActive);
        }, 4000);
      }
    } else {
      setActive(1);
      return (textBox.innerHTML = text1);
    }
  }, 10);
};

export const writeInTextBox3 = (
  viewedText,
  fxnText3,
  clearTextBox,
  setActive
) => {
  const textBox = document.getElementById('house-edge-text');
  console.log('length of text 1');
  console.log(textBox.innerHTML.length);

  let index = 0;

  let interval = setInterval(() => {
    if (!viewedText) {
      if (index < fxnText3.length) {
        setActive(3);
        textBox.innerHTML += fxnText3.charAt(index);
        fxnText3 = fxnText3.substring(1, fxnText3.length);
        console.log(fxnText3);
      } else {
        clearInterval(interval);

        setTimeout(() => {
          clearTextBox();
          setActive(1);
          textBox.innerHTML = text1;
        }, 4000);
      }
    } else {
      setActive(1);
      return (textBox.innerHTML = text1);
    }
  }, 10);
};
