function digitalRoot(n) {
  if (n < 0) return null;
  let s = n.toString();
  while (s.length > 1) {
    s = s.split('').reduce((a, v) => a + +v, 0).toString();
  }
  return +s;
}

function combinations(array, size) {

  function p(t, i) {
    if (t.length === size) {
      result.push(t);
      return;
    }
    if (i + 1 > array.length) {
      return;
    }
    p(t.concat(array[i]), i + 1);
    p(t, i + 1);
  }

  var result = [];
  p([], 0);
  return result;
}

const processButton = document.getElementById('process-button');
processButton.addEventListener('click', e => {
  const input = +document.getElementById('numbered-door').value;
  const output = document.getElementById('nine-output');
  let pool = [];
  for (let i = 1; i <= 9; ++i) {
    if (document.getElementById(i).checked) pool.push(i);
  }
  let possibilities = {
    3: [],
    4: [],
    5: []
  }
  for (let i = 3; i <= 5; ++i) {
    const combs = combinations(pool, i);
    for (let comb of combs) {
      if (digitalRoot(comb.reduce((a, v) => a + v, 0)) === input) {
        possibilities[i].push(comb);
      }
    }
  }

  output.innerHTML = '';
  for (let i = 3; i <= 5; ++i) {
    if (possibilities[i].length === 0) continue;
    let section = document.createElement('section');
    let h5 = document.createElement('h5');
    let ul = document.createElement('ul');
    section.appendChild(h5);
    section.appendChild(ul);
    h5.innerHTML = `Using ${i} persons:`;
    for (let poss of possibilities[i]) {
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.innerHTML += poss.join(', ');
      li.appendChild(span);
      span = document.createElement('span');
      const persons = poss.map(n => reversed_characters[n]);
      span.innerHTML += '(' + persons.join(', ') + ')';
      li.appendChild(span);
      ul.appendChild(li);
    }
    output.appendChild(section);
  }
  if (output.innerHTML === "") {
    output.innerHTML = "No possibilities";
  }
});

const characters = {
  "Ace": 1,
  "Snake": 2,
  "Santa": 3,
  "Clover": 4,
  "Junpei": 5,
  "June": 6,
  "Seven": 7,
  "Lotus": 8,
  "Pigeon": 9
}

const reversed_characters = Object.fromEntries(Object.entries(characters).map(c => [c[1], c[0]]));

window.onload = () => {
  const persons = document.getElementById('persons');
  for (let [k, v] of Object.entries(characters)) {
    let span = document.createElement('span');
    span.innerHTML = `<strong>${k}:</strong> ${v}`;
    persons.appendChild(span);
  }
};