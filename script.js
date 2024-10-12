let array = [];
let speed = 100;

function setActiveButton(button) {
    const buttons = document.querySelectorAll('.controls button');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

function generateArray() {
    setActiveButton(document.querySelector('button[onclick="generateArray()"]'));
    const arraySize = parseInt(document.getElementById('array-size').value);
    array = [];
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 200) + 5;
        array.push(value);

        const arrayBar = document.createElement('div');
        arrayBar.classList.add('array-bar');
        arrayBar.style.height = `${value}px`;

        const barLabel = document.createElement('div');
        barLabel.classList.add('bar-label');
        barLabel.textContent = value;

        arrayBar.appendChild(barLabel);
        arrayContainer.appendChild(arrayBar);
    }
}

function displayComplexity(algorithm) {
    const complexities = {
        'bubbleSort': 'O(n²)',
        'insertionSort': 'O(n²)',
        'selectionSort': 'O(n²)',
        'mergeSort': 'O(n log n)',
        'quickSort': 'O(n log n) (worst case O(n²))'
    };

    const complexityDisplay = document.getElementById('complexity-display');
    complexityDisplay.textContent = `Time Complexity: ${complexities[algorithm]}`;


    complexityDisplay.classList.add('highlight');
}



async function bubbleSort() {
    setActiveButton(document.querySelector('button[onclick="bubbleSort(); displayComplexity(\'bubbleSort\')"]'));
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = '#a500ff'; 
            bars[j + 1].style.backgroundColor = '#a500ff'; 

            if (array[j] > array[j + 1]) {
                await swap(j, j + 1);
            }

            bars[j].style.backgroundColor = '#4b4b4b'; 
            bars[j + 1].style.backgroundColor = '#4b4b4b'; 
        }
    }
}

async function insertionSort() {
    setActiveButton(document.querySelector('button[onclick="insertionSort(); displayComplexity(\'insertionSort\')"]'));
    const bars = document.querySelectorAll('.array-bar');
    
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = '#a500ff'; 

        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = '#a500ff'; 
            await swap(j + 1, j); 
            j--;
        }
        array[j + 1] = key; 
        bars[j + 1].style.height = `${key}px`;
        bars[j + 1].querySelector('.bar-label').textContent = key;
        bars[j + 1].style.backgroundColor = '#4b4b4b'; 
    }

   
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = '#4b4b4b'; 
    }
}


async function selectionSort() {
    setActiveButton(document.querySelector('button[onclick="selectionSort(); displayComplexity(\'selectionSort\')"]'));
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        bars[i].style.backgroundColor = '#a500ff'; 

        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = '#a500ff'; 
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
            bars[j].style.backgroundColor = '#4b4b4b'; 
        }

        if (minIdx !== i) {
            await swap(i, minIdx);
        }
        bars[i].style.backgroundColor = '#4b4b4b'; 
    }
}

async function mergeSort() {
    setActiveButton(document.querySelector('button[onclick="mergeSort(); displayComplexity(\'mergeSort\')"]'));
    if (array.length === 0) return;
    await mergeSortHelper(0, array.length - 1);
}

async function mergeSortHelper(start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSortHelper(start, mid);
        await mergeSortHelper(mid + 1, end);
        await merge(start, mid, end);
    }
}

async function merge(start, mid, end) {
    const leftArray = array.slice(start, mid + 1);
    const rightArray = array.slice(mid + 1, end + 1);
    
    let leftIndex = 0, rightIndex = 0, currentIndex = start;
    const bars = document.querySelectorAll('.array-bar');

    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        bars[currentIndex].style.backgroundColor = '#a500ff'; 
        await new Promise(resolve => setTimeout(resolve, speed));

        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            array[currentIndex] = leftArray[leftIndex];
            leftIndex++;
        } else {
            array[currentIndex] = rightArray[rightIndex];
            rightIndex++;
        }

        bars[currentIndex].style.height = `${array[currentIndex]}px`;
        bars[currentIndex].querySelector('.bar-label').textContent = array[currentIndex];
        currentIndex++;
    }

    while (leftIndex < leftArray.length) {
        array[currentIndex] = leftArray[leftIndex];
        bars[currentIndex].style.height = `${array[currentIndex]}px`;
        bars[currentIndex].querySelector('.bar-label').textContent = array[currentIndex];
        leftIndex++;
        currentIndex++;
    }

    while (rightIndex < rightArray.length) {
        array[currentIndex] = rightArray[rightIndex];
        bars[currentIndex].style.height = `${array[currentIndex]}px`;
        bars[currentIndex].querySelector('.bar-label').textContent = array[currentIndex];
        rightIndex++;
        currentIndex++;
    }

    for (let i = start; i <= end; i++) {
        bars[i].style.backgroundColor = '#4b4b4b'; 
    }
}

async function quickSort() {
    setActiveButton(document.querySelector('button[onclick="quickSort(); displayComplexity(\'quickSort\')"]'));
    if (array.length === 0) return;
    await quickSortHelper(0, array.length - 1);
}

async function quickSortHelper(start, end) {
    if (start < end) {
        const pivotIndex = await partition(start, end);
        await quickSortHelper(start, pivotIndex - 1);
        await quickSortHelper(pivotIndex + 1, end);
    }
}

async function partition(start, end) {
    const pivot = array[end];
    let partitionIndex = start;
    const bars = document.querySelectorAll('.array-bar');

    for (let i = start; i < end; i++) {
        bars[i].style.backgroundColor = '#a500ff'; 
        await new Promise(resolve => setTimeout(resolve, speed));

        if (array[i] < pivot) {
            await swap(i, partitionIndex);
            partitionIndex++;
        }
        bars[i].style.backgroundColor = '#4b4b4b'; 
    }
    await swap(partitionIndex, end);
    return partitionIndex;
}

function swap(i, j) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const bars = document.querySelectorAll('.array-bar');

            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = `${array[i]}px`;
            bars[j].style.height = `${array[j]}px`;

            bars[i].querySelector('.bar-label').textContent = array[i];
            bars[j].querySelector('.bar-label').textContent = array[j];

            resolve();
        }, speed);
    });
}

document.getElementById('speed-slider').addEventListener('input', (event) => {
    speed = parseInt(event.target.value);
    document.getElementById('speed-value').textContent = speed;
});


generateArray();
