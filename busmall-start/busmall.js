'use strict';


Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can',
'wine-glass'];

Product.all = [];
Product.container = document.getElementById('image_container');
Product.justViewed = [];
Product.pics = [document.getElementById('left'), document.getElementById('center'), document.getElementById('right')];
Product.tally = document.getElementById('tally');
Product.totalClicks = 0;

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
}
//event listener
Product.container.addEventListener('click', handleClick);
displayPics();


var data = Product.all;
var color = Chart.helpers.color;
var horizontalBarChartData = {
    labels: Product.names,
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
        borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }, {
        label: 'Dataset 2',
        backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
        borderColor: window.chartColors.blue,
        data: [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ]
    }]

};

window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    window.myHorizontalBar = new Chart(ctx, {
        type: 'horizontalBar',
        data: horizontalBarChartData,
        options: {
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                rectangle: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Chart.js Horizontal Bar Chart'
            }
        }
    });

};

// document.getElementById('randomizeData').addEventListener('click', function() {
//     var zero = Math.random() < 0.2 ? true : false;
//     horizontalBarChartData.datasets.forEach(function(dataset) {
//         dataset.data = dataset.data.map(function() {
//             return zero ? 0.0 : randomScalingFactor();
//         });

//     });
//     window.myHorizontalBar.update();
// });

var colorNames = Object.keys(window.chartColors);

// document.getElementById('addDataset').addEventListener('click', function() {
//     var colorName = colorNames[horizontalBarChartData.datasets.length % colorNames.length];;
//     var dsColor = window.chartColors[colorName];
//     var newDataset = {
//         label: 'Dataset ' + horizontalBarChartData.datasets.length,
//         backgroundColor: color(dsColor).alpha(0.5).rgbString(),
//         borderColor: dsColor,
//         data: []
//     };

//     for (var index = 0; index < horizontalBarChartData.labels.length; ++index) {
//         newDataset.data.push(randomScalingFactor());
//     }

//     horizontalBarChartData.datasets.push(newDataset);
//     window.myHorizontalBar.update();
// });

// document.getElementById('addData').addEventListener('click', function() {
//     if (horizontalBarChartData.datasets.length > 0) {
//         var month = MONTHS[horizontalBarChartData.labels.length % MONTHS.length];
//         horizontalBarChartData.labels.push(month);

//         for (var index = 0; index < horizontalBarChartData.datasets.length; ++index) {
//             horizontalBarChartData.datasets[index].data.push(randomScalingFactor());
//         }

//         window.myHorizontalBar.update();
//     }
// });

// document.getElementById('removeDataset').addEventListener('click', function() {
//     horizontalBarChartData.datasets.splice(0, 1);
//     window.myHorizontalBar.update();
// });

// document.getElementById('removeData').addEventListener('click', function() {
//     horizontalBarChartData.labels.splice(-1, 1); // remove the label first

//     horizontalBarChartData.datasets.forEach(function (dataset, datasetIndex) {
//         dataset.data.pop();
//     });

//     window.myHorizontalBar.update();
// });


