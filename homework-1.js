const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ticketPrice(category) {
  switch (category) {
    case 1: return 300;
    case 2: return 500;
    case 3: return 900;
    default: return 0;
  }
}

function maxTickets(budget, price) {
  let count = 0;
  let rest = budget;
  while (rest >= price) {
    rest = rest - price;
    count = count + 1;
  }
  return count;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);
  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }
  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

function deliveryPrice(distance, total) {
  if (total >= 3000) return 0;
  if (distance <= 3) return 0;
  if (distance <= 10) return 200;
  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
  let built = 0;
  for (let i = 1; i <= height; i++) {
    if (i === 4) continue;
    console.log(`Ступень ${i}`);
    built = built + 1;
    if (i === 10) {
      console.log('Дальше лестница не построена');
      break;
    }
  }
  console.log(`Всего построено: ${built}`);
}

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');

rl.question('Ваш выбор: ', (choice) => {
  if (choice === '1') {
    rl.question('Категория билета: ', (cat) => {
      rl.question('Бюджет: ', (bud) => {
        printTicketResult(Number(cat), Number(bud));
        rl.close();
      });
    });
  } else if (choice === '2') {
    rl.question('Расстояние: ', (dist) => {
      rl.question('Сумма заказа: ', (sum) => {
        printDelivery(Number(dist), Number(sum));
        rl.close();
      });
    });
  } else if (choice === '3') {
    rl.question('Высота лестницы: ', (h) => {
      printSteps(Number(h));
      rl.close();
    });
  } else {
    console.log('такой задачи нет');
    rl.close();
  }
});