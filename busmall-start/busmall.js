'use strict';
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can',
'wine-glass'];
Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;
var votes = [];
function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.votes = 0;
  this.views = 0;
  Product.all.push(this);
}
for(var i = 0; i < Product.names.length; i++) {
  new Product(Product.names[i]);
}
function makeRandom() {
  return Math.floor(Math.random() * Product.names.length);
}
function displayPics() {
  var currentlyShowing = [];
  currentlyShowing[0] = makeRandom();
  while (Product.justViewed.indexOf(currentlyShowing[0]) !== -1) {
    console.error('Duplicate, or in prior view! Re run!');
    currentlyShowing[0] = makeRandom();
  }
  //make center image unique
  currentlyShowing[1] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[1] || Product.justViewed.indexOf(currentlyShowing[1]) !== -1) {
    console.error('Duplicate at center, or in prior view! Re run!');
    currentlyShowing[1] = makeRandom();
  }
  //make right image unique
  currentlyShowing[2] = makeRandom();
  while(currentlyShowing[0] === currentlyShowing[2] || currentlyShowing[1] === currentlyShowing[2] || Product.justViewed.indexOf(currentlyShowing[2]) !== -1) {
    console.error('Duplicate at 3rd one! Re run it!');
    currentlyShowing[2] = makeRandom();
  }
  //take the info to the DOM!...and beyond...
  for(var i = 0; i < 3; i++) {
    Product.pics[i].src = Product.all[currentlyShowing[i]].path;
    Product.pics[i].id = Product.all[currentlyShowing[i]].name;
    Product.all[currentlyShowing[i]].views += 1;
    Product.justViewed[i] = currentlyShowing[i];
  }
}
//handle click events
function handleClick(event) {
  console.log(Product.totalClicks, 'total clicks');
  if(Product.totalClicks >= 24) {
    Product.container.removeEventListener('click', handleClick);
    showTally();
  }
  if (event.target.id === 'image_container') {
    return alert('Nope, you need to click on an image.');
  }
  Product.totalClicks += 1;
  for(var i = 0; i < Product.names.length; i++) {
    if(event.target.id === Product.all[i].name) {
      Product.all[i].votes += 1;
      console.log(event.target.id + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views');
    }
  }
  displayPics();
}
//show tally using list in DOM
function showTally() {
  for(var i = 0; i < Product.all.length; i++) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.all[i].name + ' has ' + Product.all[i].votes + ' votes in ' + Product.all[i].views + ' views';
    Product.tally.appendChild(liEl);
  }
  createChart();
}
//event listener
Product.container.addEventListener('click', handleClick);
displayPics();
function createChart() {
  for(var i = 0; i < Product.names.length; i++) {
    votes.push(Product.all[i].votes);
  }
  //this holds the value for the votes of each product image
  var labelColors = [
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'orange',
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'orange',
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'orange',
    'red',
    'blue',
    'yellow',
    'green',
    'purple',
    'orange'
  ];
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Product.names,
      datasets: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: labelColors
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}